const { resolve } = require

module.exports = {
  extends: [
    'plugin:eslint-comments/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:promise/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['import', '@typescript-eslint', 'react', 'react-hooks'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    // 支持最新 JavaScript
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      },
      typescript: {
        directory: [resolve('./tsconfig.json')]
      }
    }
  },
  env: {
    es6: true,
    node: true
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      { ts: 'never', tsx: 'never', json: 'never', js: 'never' }
    ],
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react/state-in-constructor': [2, 'never']
  },
  overrides: [
    {
      files: ['**/*.d.ts'],
      rules: {
        'import/no-duplicate': 'off'
      }
    },
    {
      files: ['scripts/**/*.ts'],
      rules: {
        'import/no-extraneous-dependencies': 'off'
      }
    }
  ]
}
