import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import { standard } from './eslint.standard.mjs'
import { standardJsx } from './eslint.standard-jsx.mjs'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

const eslintConfig = [
  ...compat.config({
    extends: [
      'next/core-web-vitals',
      'next/typescript',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'prettier',
      'next'
    ],
    rules: {
      ...standard.rules,
      ...standardJsx.rules
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true
      }
    }
  })
]

export default eslintConfig
