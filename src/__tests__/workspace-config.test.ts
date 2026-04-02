/**
 * Tests for workspace configuration JSON files added in this PR.
 * Validates structure, required fields, and constraint conformance.
 */
import { readFileSync } from 'fs'
import { resolve } from 'path'

const ROOT = resolve(__dirname, '../..')

function readJson(relPath: string) {
  const content = readFileSync(resolve(ROOT, relPath), 'utf8')
  return JSON.parse(content)
}

// ---------------------------------------------------------------------------
// .claude/settings.json
// ---------------------------------------------------------------------------
describe('.claude/settings.json', () => {
  let settings: Record<string, unknown>

  beforeAll(() => {
    settings = readJson('.claude/settings.json')
  })

  it('is valid JSON with a $schema field', () => {
    expect(typeof settings.$schema).toBe('string')
    expect(settings.$schema).toContain('schemastore.org')
  })

  it('has a permissions object with allow and deny arrays', () => {
    const perms = settings.permissions as Record<string, string[]>
    expect(perms).toBeDefined()
    expect(Array.isArray(perms.allow)).toBe(true)
    expect(Array.isArray(perms.deny)).toBe(true)
  })

  it('allows the required tool set', () => {
    const { allow } = settings.permissions as Record<string, string[]>
    expect(allow).toContain('Bash')
    expect(allow).toContain('Write')
    expect(allow).toContain('Edit')
    expect(allow).toContain('WebFetch')
  })

  it('denies access to .env files for Bash, Edit, and Read', () => {
    const { deny } = settings.permissions as Record<string, string[]>
    const denySet = new Set(deny)
    expect(denySet.has('Bash(cat .env*)')).toBe(true)
    expect(denySet.has('Edit(.env*)')).toBe(true)
    expect(denySet.has('Read(.env*)')).toBe(true)
  })

  it('denies Bash echo $* to prevent secret leaks', () => {
    const { deny } = settings.permissions as Record<string, string[]>
    expect(deny).toContain('Bash(echo $*)')
  })

  it('deny list contains no duplicates', () => {
    const { deny } = settings.permissions as Record<string, string[]>
    const unique = new Set(deny)
    expect(unique.size).toBe(deny.length)
  })

  it('allow list contains no duplicates', () => {
    const { allow } = settings.permissions as Record<string, string[]>
    const unique = new Set(allow)
    expect(unique.size).toBe(allow.length)
  })

  it('has a hooks object with PostToolUse configuration', () => {
    const hooks = settings.hooks as Record<string, unknown[]>
    expect(hooks).toBeDefined()
    expect(Array.isArray(hooks.PostToolUse)).toBe(true)
    expect(hooks.PostToolUse.length).toBeGreaterThan(0)
  })

  it('PostToolUse hook targets Edit|Write matcher', () => {
    interface HookEntry {
      hooks: Array<{ type: string; command: string }>
      matcher: string
    }
    const postToolUse = (
      settings.hooks as Record<string, HookEntry[]>
    ).PostToolUse
    const entry = postToolUse[0]
    expect(entry.matcher).toBe('Edit|Write')
  })

  it('PostToolUse hook command lints markdown files', () => {
    interface HookEntry {
      hooks: Array<{ type: string; command: string }>
      matcher: string
    }
    const postToolUse = (
      settings.hooks as Record<string, HookEntry[]>
    ).PostToolUse
    const hook = postToolUse[0].hooks[0]
    expect(hook.type).toBe('command')
    expect(hook.command).toContain('markdownlint')
    expect(hook.command).toContain('.md')
  })

  it('does not allow any permission that could expose secrets', () => {
    // The allow list must never include wildcards on env or secret files
    const { allow } = settings.permissions as Record<string, string[]>
    for (const entry of allow) {
      expect(entry).not.toMatch(/\.env/)
    }
  })
})

// ---------------------------------------------------------------------------
// .claude/launch.json
// ---------------------------------------------------------------------------
describe('.claude/launch.json', () => {
  let launch: Record<string, unknown>

  beforeAll(() => {
    launch = readJson('.claude/launch.json')
  })

  it('has a version field', () => {
    expect(typeof launch.version).toBe('string')
  })

  it('has a configurations array', () => {
    expect(Array.isArray(launch.configurations)).toBe(true)
    expect((launch.configurations as unknown[]).length).toBeGreaterThan(0)
  })

  it('every configuration has a name, runtimeExecutable, and port', () => {
    interface Config {
      name: string
      runtimeExecutable: string
      runtimeArgs: string[]
      port: number
    }
    const configs = launch.configurations as Config[]
    for (const cfg of configs) {
      expect(typeof cfg.name).toBe('string')
      expect(cfg.name.length).toBeGreaterThan(0)
      expect(typeof cfg.runtimeExecutable).toBe('string')
      expect(typeof cfg.port).toBe('number')
    }
  })

  it('soia-dev configuration uses npm as runtime executable', () => {
    interface Config {
      name: string
      runtimeExecutable: string
      runtimeArgs: string[]
      port: number
    }
    const configs = launch.configurations as Config[]
    const soiaDev = configs.find((c) => c.name === 'soia-dev')
    expect(soiaDev).toBeDefined()
    expect(soiaDev!.runtimeExecutable).toBe('npm')
  })

  it('soia-dev configuration runs the dev script', () => {
    interface Config {
      name: string
      runtimeExecutable: string
      runtimeArgs: string[]
      port: number
    }
    const configs = launch.configurations as Config[]
    const soiaDev = configs.find((c) => c.name === 'soia-dev')
    expect(soiaDev!.runtimeArgs).toContain('dev')
  })

  it('soia-dev configuration uses port 3000', () => {
    interface Config {
      name: string
      runtimeExecutable: string
      runtimeArgs: string[]
      port: number
    }
    const configs = launch.configurations as Config[]
    const soiaDev = configs.find((c) => c.name === 'soia-dev')
    expect(soiaDev!.port).toBe(3000)
  })

  it('port is a positive integer', () => {
    interface Config {
      port: number
    }
    const configs = launch.configurations as Config[]
    for (const cfg of configs) {
      expect(cfg.port).toBeGreaterThan(0)
      expect(Number.isInteger(cfg.port)).toBe(true)
    }
  })
})

// ---------------------------------------------------------------------------
// .froject.json
// ---------------------------------------------------------------------------
describe('.froject.json', () => {
  let froject: Record<string, unknown>

  beforeAll(() => {
    froject = readJson('.froject.json')
  })

  it('has a version field', () => {
    expect(typeof froject.version).toBe('string')
  })

  it('has a generator field identifying the-froject', () => {
    expect(froject.generator).toBe('the-froject')
  })

  it('has a generatedAt ISO-8601 timestamp', () => {
    expect(typeof froject.generatedAt).toBe('string')
    const date = new Date(froject.generatedAt as string)
    expect(isNaN(date.getTime())).toBe(false)
  })

  it('hatched field is a boolean or the string "partial"', () => {
    const { hatched } = froject
    const valid =
      typeof hatched === 'boolean' || hatched === 'partial'
    expect(valid).toBe(true)
  })

  it('has a frog object with id, name, description, tagline, and palette', () => {
    interface Frog {
      id: string
      name: string
      description: string
      tagline: string
      palette: { primary: string; secondary: string; accent: string }
    }
    const frog = froject.frog as Frog
    expect(typeof frog.id).toBe('string')
    expect(typeof frog.name).toBe('string')
    expect(typeof frog.description).toBe('string')
    expect(typeof frog.tagline).toBe('string')
    expect(typeof frog.palette).toBe('object')
  })

  it('frog palette contains primary, secondary, and accent hex colors', () => {
    interface Palette {
      primary: string
      secondary: string
      accent: string
    }
    const palette = (froject.frog as { palette: Palette }).palette
    const hexPattern = /^#[0-9a-fA-F]{6}$/
    expect(palette.primary).toMatch(hexPattern)
    expect(palette.secondary).toMatch(hexPattern)
    expect(palette.accent).toMatch(hexPattern)
  })

  it('has a project object with required fields', () => {
    interface Project {
      name: string
      description: string
      type: string
      languages: string[]
      tools: string[]
      role: string
    }
    const project = froject.project as Project
    expect(typeof project.name).toBe('string')
    expect(typeof project.description).toBe('string')
    expect(typeof project.type).toBe('string')
    expect(Array.isArray(project.languages)).toBe(true)
    expect(Array.isArray(project.tools)).toBe(true)
    expect(typeof project.role).toBe('string')
  })

  it('project type is one of the known workspace types', () => {
    const knownTypes = [
      'frontend',
      'backend',
      'fullstack',
      'software',
      'data-science',
      'operations',
      'marketing',
      'sales',
      'product',
      'people-culture',
      'research',
      'design',
      'general',
    ]
    const project = froject.project as { type: string }
    expect(knownTypes).toContain(project.type)
  })

  it('project languages is a non-empty array of strings', () => {
    const project = froject.project as { languages: string[] }
    expect(project.languages.length).toBeGreaterThan(0)
    for (const lang of project.languages) {
      expect(typeof lang).toBe('string')
    }
  })

  it('has mcpIntegrations array', () => {
    const project = froject.project as { mcpIntegrations: unknown[] }
    expect(Array.isArray(project.mcpIntegrations)).toBe(true)
  })

  it('each mcpIntegration has required fields', () => {
    interface McpIntegration {
      name: string
      mcpStatus: string
      mcpInstall: string
      isTaskManager: boolean
      contextType: string
      contextTargets: string[]
    }
    const project = froject.project as { mcpIntegrations: McpIntegration[] }
    for (const integration of project.mcpIntegrations) {
      expect(typeof integration.name).toBe('string')
      expect(typeof integration.mcpStatus).toBe('string')
      expect(typeof integration.mcpInstall).toBe('string')
      expect(typeof integration.isTaskManager).toBe('boolean')
      expect(typeof integration.contextType).toBe('string')
      expect(Array.isArray(integration.contextTargets)).toBe(true)
    }
  })

  it('mcpStatus is either "official" or "community"', () => {
    interface McpIntegration {
      mcpStatus: string
    }
    const project = froject.project as { mcpIntegrations: McpIntegration[] }
    for (const integration of project.mcpIntegrations) {
      expect(['official', 'community']).toContain(integration.mcpStatus)
    }
  })

  it('exactly one mcpIntegration is the task manager', () => {
    interface McpIntegration {
      isTaskManager: boolean
    }
    const project = froject.project as { mcpIntegrations: McpIntegration[] }
    const taskManagers = project.mcpIntegrations.filter(
      (i) => i.isTaskManager
    )
    expect(taskManagers.length).toBe(1)
  })

  it('has a generatedFiles array of non-empty strings', () => {
    expect(Array.isArray(froject.generatedFiles)).toBe(true)
    const files = froject.generatedFiles as string[]
    expect(files.length).toBeGreaterThan(0)
    for (const f of files) {
      expect(typeof f).toBe('string')
      expect(f.length).toBeGreaterThan(0)
    }
  })

  it('generatedFiles includes the key workspace files', () => {
    const files = new Set(froject.generatedFiles as string[])
    expect(files.has('CLAUDE.md')).toBe(true)
    expect(files.has('.froject.json')).toBe(true)
    expect(files.has('.claudeignore')).toBe(true)
    expect(files.has('.claude/settings.json')).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// .cta.json
// ---------------------------------------------------------------------------
describe('.cta.json', () => {
  let cta: Record<string, unknown>

  beforeAll(() => {
    cta = readJson('.cta.json')
  })

  it('is valid JSON', () => {
    expect(cta).toBeDefined()
  })

  it('has a projectName field', () => {
    expect(typeof cta.projectName).toBe('string')
    expect((cta.projectName as string).length).toBeGreaterThan(0)
  })

  it('has a version field that is a number', () => {
    expect(typeof cta.version).toBe('number')
  })

  it('has a framework field', () => {
    expect(typeof cta.framework).toBe('string')
  })

  it('has a chosenAddOns array', () => {
    expect(Array.isArray(cta.chosenAddOns)).toBe(true)
  })

  it('chosenAddOns contains eslint', () => {
    expect(cta.chosenAddOns as string[]).toContain('eslint')
  })

  it('chosenAddOns contains form', () => {
    expect(cta.chosenAddOns as string[]).toContain('form')
  })

  it('typescript flag is a boolean', () => {
    expect(typeof cta.typescript).toBe('boolean')
  })

  it('typescript is enabled', () => {
    expect(cta.typescript).toBe(true)
  })

  it('tailwind flag is a boolean', () => {
    expect(typeof cta.tailwind).toBe('boolean')
  })

  it('git flag is a boolean', () => {
    expect(typeof cta.git).toBe('boolean')
  })

  it('chosenAddOns contains no duplicate entries', () => {
    const addOns = cta.chosenAddOns as string[]
    expect(new Set(addOns).size).toBe(addOns.length)
  })
})