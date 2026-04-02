/**
 * Tests for Claude Code workspace markdown files added in this PR.
 * Validates YAML frontmatter structure, required sections, and content rules.
 */
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

const ROOT = resolve(__dirname, '../..')

function readFile(relPath: string): string {
  return readFileSync(resolve(ROOT, relPath), 'utf8')
}

function fileExists(relPath: string): boolean {
  return existsSync(resolve(ROOT, relPath))
}

/**
 * Parse YAML-style frontmatter from a markdown file.
 * Returns the frontmatter block as a raw string (between the first pair of ---).
 */
function parseFrontmatter(content: string): Record<string, string> | null {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return null
  const block = match[1]
  const result: Record<string, string> = {}
  for (const line of block.split('\n')) {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue
    const key = line.slice(0, colonIdx).trim()
    const value = line.slice(colonIdx + 1).trim()
    result[key] = value
  }
  return result
}

function hasFrontmatter(content: string): boolean {
  return content.startsWith('---\n')
}

// ---------------------------------------------------------------------------
// .claude/agents — Agent definition files
// ---------------------------------------------------------------------------
describe('.claude/agents/', () => {
  const agents = [
    '.claude/agents/api-designer.md',
    '.claude/agents/code-reviewer.md',
    '.claude/agents/content-editor.md',
    '.claude/agents/design-auditor.md',
  ]

  it.each(agents)('%s exists', (path) => {
    expect(fileExists(path)).toBe(true)
  })

  it.each(agents)('%s has YAML frontmatter', (path) => {
    const content = readFile(path)
    expect(hasFrontmatter(content)).toBe(true)
  })

  it.each(agents)('%s frontmatter has a non-empty name field', (path) => {
    const content = readFile(path)
    const fm = parseFrontmatter(content)
    expect(fm).not.toBeNull()
    expect(typeof fm!.name).toBe('string')
    expect(fm!.name.length).toBeGreaterThan(0)
  })

  it.each(agents)('%s frontmatter has a non-empty description', (path) => {
    const content = readFile(path)
    const fm = parseFrontmatter(content)
    expect(fm!.description.length).toBeGreaterThan(0)
  })

  it.each(agents)('%s frontmatter has a tools field', (path) => {
    const content = readFile(path)
    const fm = parseFrontmatter(content)
    expect(typeof fm!.tools).toBe('string')
    expect(fm!.tools.length).toBeGreaterThan(0)
  })

  it.each(agents)('%s body describes an output structure for findings', (path) => {
    const content = readFile(path)
    // All agents define how to structure their output/findings
    expect(content).toMatch(/[Oo]utput [Ff]ormat|[Oo]utput findings/)
  })

  it.each(agents)('%s body contains a step-by-step workflow or numbered list', (path) => {
    const content = readFile(path)
    // Must contain at least one numbered list item
    expect(content).toMatch(/\d+\.\s+/)
  })

  it('api-designer has maxTurns set to 15', () => {
    const content = readFile('.claude/agents/api-designer.md')
    const fm = parseFrontmatter(content)
    expect(fm!.maxTurns).toBe('15')
  })

  it('api-designer tools include WebSearch for documentation lookup', () => {
    const content = readFile('.claude/agents/api-designer.md')
    const fm = parseFrontmatter(content)
    expect(fm!.tools).toContain('WebSearch')
  })

  it('code-reviewer maxTurns is set to 10', () => {
    const content = readFile('.claude/agents/code-reviewer.md')
    const fm = parseFrontmatter(content)
    expect(fm!.maxTurns).toBe('10')
  })

  it('code-reviewer tools do not include Write (read-only reviewer)', () => {
    const content = readFile('.claude/agents/code-reviewer.md')
    const fm = parseFrontmatter(content)
    const tools = fm!.tools.split(',').map((t) => t.trim())
    expect(tools).not.toContain('Write')
  })

  it('design-auditor uses the haiku model for cost efficiency', () => {
    const content = readFile('.claude/agents/design-auditor.md')
    const fm = parseFrontmatter(content)
    expect(fm!.model).toBe('haiku')
  })

  it('design-auditor tools do not include Write (read-only auditor)', () => {
    const content = readFile('.claude/agents/design-auditor.md')
    const fm = parseFrontmatter(content)
    const tools = fm!.tools.split(',').map((t) => t.trim())
    expect(tools).not.toContain('Write')
  })

  it('content-editor tools include Write and Edit for making edits', () => {
    const content = readFile('.claude/agents/content-editor.md')
    const fm = parseFrontmatter(content)
    const tools = fm!.tools.split(',').map((t) => t.trim())
    expect(tools).toContain('Write')
    expect(tools).toContain('Edit')
  })

  it('agent names match the filename slug', () => {
    const nameMap: Record<string, string> = {
      '.claude/agents/api-designer.md': 'api-designer',
      '.claude/agents/code-reviewer.md': 'code-reviewer',
      '.claude/agents/content-editor.md': 'content-editor',
      '.claude/agents/design-auditor.md': 'design-auditor',
    }
    for (const [path, expectedName] of Object.entries(nameMap)) {
      const content = readFile(path)
      const fm = parseFrontmatter(content)
      expect(fm!.name).toBe(expectedName)
    }
  })
})

// ---------------------------------------------------------------------------
// .claude/commands — Command definition files
// ---------------------------------------------------------------------------
describe('.claude/commands/', () => {
  const commandsWithFrontmatter = [
    '.claude/commands/close.md',
    '.claude/commands/create-plan.md',
    '.claude/commands/implement.md',
    '.claude/commands/work.md',
    '.claude/commands/hatch.md',
  ]

  const allCommands = [
    '.claude/commands/close.md',
    '.claude/commands/create-plan.md',
    '.claude/commands/draft.md',
    '.claude/commands/hatch.md',
    '.claude/commands/implement.md',
    '.claude/commands/prime.md',
    '.claude/commands/research.md',
    '.claude/commands/review.md',
    '.claude/commands/work.md',
  ]

  it.each(allCommands)('%s exists', (path) => {
    expect(fileExists(path)).toBe(true)
  })

  it.each(allCommands)('%s is non-empty', (path) => {
    const content = readFile(path)
    expect(content.trim().length).toBeGreaterThan(0)
  })

  it.each(commandsWithFrontmatter)('%s has YAML frontmatter', (path) => {
    const content = readFile(path)
    expect(hasFrontmatter(content)).toBe(true)
  })

  it.each(commandsWithFrontmatter)('%s frontmatter has a description', (path) => {
    const content = readFile(path)
    const fm = parseFrontmatter(content)
    expect(fm).not.toBeNull()
    expect(fm!.description.length).toBeGreaterThan(0)
  })

  it('close.md contains a session summary step', () => {
    const content = readFile('.claude/commands/close.md')
    expect(content).toMatch(/[Ss]ession [Ss]ummary/)
  })

  it('close.md contains workspace update instructions', () => {
    const content = readFile('.claude/commands/close.md')
    expect(content).toContain('CLAUDE.md')
  })

  it('create-plan.md has disable-model-invocation set to true', () => {
    const content = readFile('.claude/commands/create-plan.md')
    const fm = parseFrontmatter(content)
    expect(fm!['disable-model-invocation']).toBe('true')
  })

  it('create-plan.md mentions plans/ directory for output', () => {
    const content = readFile('.claude/commands/create-plan.md')
    expect(content).toContain('plans/')
  })

  it('implement.md has disable-model-invocation set to true', () => {
    const content = readFile('.claude/commands/implement.md')
    const fm = parseFrontmatter(content)
    expect(fm!['disable-model-invocation']).toBe('true')
  })

  it('implement.md describes a step-by-step execution loop', () => {
    const content = readFile('.claude/commands/implement.md')
    expect(content).toMatch(/step/i)
    expect(content).toMatch(/verify|verification/i)
  })

  it('work.md has disable-model-invocation set to true', () => {
    const content = readFile('.claude/commands/work.md')
    const fm = parseFrontmatter(content)
    expect(fm!['disable-model-invocation']).toBe('true')
  })

  it('work.md includes a fallback section for missing MCP connections', () => {
    const content = readFile('.claude/commands/work.md')
    expect(content).toMatch(/[Ff]allback/)
  })

  it('hatch.md references .froject.json', () => {
    const content = readFile('.claude/commands/hatch.md')
    expect(content).toContain('.froject.json')
  })

  it('hatch.md contains Phase sections for its workflow', () => {
    const content = readFile('.claude/commands/hatch.md')
    expect(content).toMatch(/Phase \d+/)
  })

  it('prime.md describes hatched status handling', () => {
    const content = readFile('.claude/commands/prime.md')
    expect(content).toContain('hatched')
  })

  it('prime.md references /hatch command when not hatched', () => {
    const content = readFile('.claude/commands/prime.md')
    expect(content).toContain('/hatch')
  })

  it('research.md contains a structured output format with key findings', () => {
    const content = readFile('.claude/commands/research.md')
    expect(content).toMatch(/[Kk]ey findings/)
  })

  it('review.md covers security in its review criteria', () => {
    const content = readFile('.claude/commands/review.md')
    expect(content).toMatch(/[Ss]ecurity/)
    expect(content).toMatch(/OWASP/)
  })

  it('draft.md covers multiple content types', () => {
    const content = readFile('.claude/commands/draft.md')
    expect(content).toMatch(/blog/)
    expect(content).toMatch(/email/)
  })
})

// ---------------------------------------------------------------------------
// .claude/rules — Rule definition files
// ---------------------------------------------------------------------------
describe('.claude/rules/', () => {
  const rules = [
    '.claude/rules/brand-voice.md',
    '.claude/rules/code-style.md',
    '.claude/rules/context-management.md',
    '.claude/rules/documentation.md',
  ]

  it.each(rules)('%s exists', (path) => {
    expect(fileExists(path)).toBe(true)
  })

  it.each(rules)('%s has YAML frontmatter', (path) => {
    const content = readFile(path)
    expect(hasFrontmatter(content)).toBe(true)
  })

  it.each(rules)('%s frontmatter has a non-empty description', (path) => {
    const content = readFile(path)
    const fm = parseFrontmatter(content)
    expect(fm).not.toBeNull()
    expect(fm!.description.length).toBeGreaterThan(0)
  })

  it('brand-voice.md has globs targeting content and markdown files', () => {
    const content = readFile('.claude/rules/brand-voice.md')
    expect(content).toContain('content/**')
    expect(content).toContain('**/*.md')
  })

  it('brand-voice.md lists words to avoid', () => {
    const content = readFile('.claude/rules/brand-voice.md')
    // The "Avoid" section lists buzzwords
    expect(content).toMatch(/[Aa]void/)
    expect(content).toMatch(/synergy|leverage|cutting-edge/)
  })

  it('code-style.md specifies naming conventions', () => {
    const content = readFile('.claude/rules/code-style.md')
    expect(content).toMatch(/camelCase/)
    expect(content).toMatch(/PascalCase/)
  })

  it('code-style.md specifies a maximum line length', () => {
    const content = readFile('.claude/rules/code-style.md')
    expect(content).toMatch(/\d+\s+char/)
  })

  it('code-style.md includes examples of violations', () => {
    const content = readFile('.claude/rules/code-style.md')
    expect(content).toContain('violations')
  })

  it('context-management.md mentions saving to files not conversation memory', () => {
    const content = readFile('.claude/rules/context-management.md')
    expect(content).toMatch(/save|files/)
    expect(content).toMatch(/memory/)
  })

  it('context-management.md mentions CLAUDE.md for workspace updates', () => {
    const content = readFile('.claude/rules/context-management.md')
    expect(content).toContain('CLAUDE.md')
  })

  it('documentation.md specifies docstring requirements for public functions', () => {
    const content = readFile('.claude/rules/documentation.md')
    expect(content).toMatch(/docstring|function|method/)
  })

  it('documentation.md includes a documentation hierarchy', () => {
    const content = readFile('.claude/rules/documentation.md')
    expect(content).toMatch(/hierarch/)
  })
})

// ---------------------------------------------------------------------------
// .claude/skills — Skill definition files
// ---------------------------------------------------------------------------
describe('.claude/skills/', () => {
  const skills = [
    '.claude/skills/accessibility-auditor/SKILL.md',
    '.claude/skills/code-reviewer/SKILL.md',
    '.claude/skills/documentation-writer/SKILL.md',
    '.claude/skills/frontend-designer/SKILL.md',
    '.claude/skills/page-cro/SKILL.md',
    '.claude/skills/project-manager/SKILL.md',
  ]

  it.each(skills)('%s exists', (path) => {
    expect(fileExists(path)).toBe(true)
  })

  it.each(skills)('%s has YAML frontmatter', (path) => {
    const content = readFile(path)
    expect(hasFrontmatter(content)).toBe(true)
  })

  it.each(skills)('%s frontmatter has a non-empty name', (path) => {
    const content = readFile(path)
    const fm = parseFrontmatter(content)
    expect(fm).not.toBeNull()
    expect(fm!.name.length).toBeGreaterThan(0)
  })

  it.each(skills)('%s frontmatter has a non-empty description', (path) => {
    const content = readFile(path)
    const fm = parseFrontmatter(content)
    expect(fm!.description.length).toBeGreaterThan(0)
  })

  it.each(skills)('%s contains a "Do NOT" section with constraints', (path) => {
    const content = readFile(path)
    expect(content).toContain('Do NOT')
  })

  it.each(skills)('%s mentions gathering context or has an audit framework', (path) => {
    const content = readFile(path)
    // Skills either have an explicit "Gather Context" step or a structured framework
    expect(content).toMatch(
      /[Gg]ather [Cc]ontext|[Cc]ontext [Ff]irst|[Aa]udit [Ff]ramework|[Rr]eview [Pp]rocess|[Pp]lanning [Pp]rocess/
    )
  })

  it('accessibility-auditor references WCAG 2.1', () => {
    const content = readFile('.claude/skills/accessibility-auditor/SKILL.md')
    expect(content).toContain('WCAG 2.1')
  })

  it('accessibility-auditor covers all four WCAG principles', () => {
    const content = readFile('.claude/skills/accessibility-auditor/SKILL.md')
    expect(content).toMatch(/[Pp]erceivable/)
    expect(content).toMatch(/[Oo]perable/)
    expect(content).toMatch(/[Uu]nderstandable/)
    expect(content).toMatch(/[Rr]obust/)
  })

  it('accessibility-auditor warns that automated tools only catch ~30% of issues', () => {
    const content = readFile('.claude/skills/accessibility-auditor/SKILL.md')
    expect(content).toContain('30%')
  })

  it('code-reviewer covers security phase using OWASP Top 10', () => {
    const content = readFile('.claude/skills/code-reviewer/SKILL.md')
    expect(content).toContain('OWASP')
  })

  it('code-reviewer has a multi-phase review process', () => {
    const content = readFile('.claude/skills/code-reviewer/SKILL.md')
    expect(content).toMatch(/Phase \d+/)
  })

  it('code-reviewer output format includes "What\'s Good" section', () => {
    const content = readFile('.claude/skills/code-reviewer/SKILL.md')
    expect(content).toMatch(/[Ww]hat.s Good/)
  })

  it('documentation-writer covers multiple documentation types', () => {
    const content = readFile('.claude/skills/documentation-writer/SKILL.md')
    expect(content).toMatch(/README/)
    expect(content).toMatch(/API [Dd]oc/)
  })

  it('documentation-writer output saves to a specific location', () => {
    const content = readFile('.claude/skills/documentation-writer/SKILL.md')
    expect(content).toMatch(/docs\/|root directory/)
  })

  it('frontend-designer covers semantic HTML as first step', () => {
    const content = readFile('.claude/skills/frontend-designer/SKILL.md')
    expect(content).toMatch(/[Ss]emantic HTML/)
  })

  it('frontend-designer covers accessibility requirements', () => {
    const content = readFile('.claude/skills/frontend-designer/SKILL.md')
    expect(content).toMatch(/[Aa]ccessib/)
    expect(content).toMatch(/keyboard/i)
  })

  it('frontend-designer advocates mobile-first responsive design', () => {
    const content = readFile('.claude/skills/frontend-designer/SKILL.md')
    expect(content).toMatch(/mobile.first/)
  })

  it('page-cro references the 5-second test for clarity', () => {
    const content = readFile('.claude/skills/page-cro/SKILL.md')
    expect(content).toMatch(/5.second/i)
  })

  it('page-cro lists CRO principles with Hick\'s Law', () => {
    const content = readFile('.claude/skills/page-cro/SKILL.md')
    expect(content).toContain("Hick's Law")
  })

  it('page-cro output saves to outputs/ directory', () => {
    const content = readFile('.claude/skills/page-cro/SKILL.md')
    expect(content).toContain('outputs/')
  })

  it('project-manager includes an ICE prioritization framework', () => {
    const content = readFile('.claude/skills/project-manager/SKILL.md')
    expect(content).toContain('ICE')
  })

  it('project-manager output saves plans to plans/ directory', () => {
    const content = readFile('.claude/skills/project-manager/SKILL.md')
    expect(content).toContain('plans/')
  })

  it('project-manager status update format includes Blocked section', () => {
    const content = readFile('.claude/skills/project-manager/SKILL.md')
    expect(content).toMatch(/[Bb]locked/)
  })
})

// ---------------------------------------------------------------------------
// .claudeignore
// ---------------------------------------------------------------------------
describe('.claudeignore', () => {
  let content: string

  beforeAll(() => {
    content = readFile('.claudeignore')
  })

  it('exists and is non-empty', () => {
    expect(fileExists('.claudeignore')).toBe(true)
    expect(content.trim().length).toBeGreaterThan(0)
  })

  it('ignores node_modules/', () => {
    expect(content).toContain('node_modules/')
  })

  it('ignores .env files', () => {
    expect(content).toMatch(/\.env/)
  })

  it('ignores .git/ directory', () => {
    expect(content).toContain('.git/')
  })

  it('ignores build output directories', () => {
    expect(content).toMatch(/dist\/|build\//)
  })

  it('ignores auto-generated routeTree.gen.ts', () => {
    expect(content).toContain('routeTree.gen.ts')
  })
})