
import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  ...tanstackConfig,
  {
    // Ignore config files that aren't in tsconfig project
    ignores: ['*.config.js', 'dist/**', 'node_modules/**'],
  },
]
