// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@stylistic/quotes': [
        'error',
        'single',
        {
          'allowTemplateLiterals': true
        }
      ]
    }
  },
  {
    ignores: [
      'src/**/*.js'
    ]
  }
)
