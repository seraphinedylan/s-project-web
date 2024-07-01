module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'prettier',
    'plugin:react-hooks/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', 'react-hooks', 'react-refresh', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'tailwindcss/no-custom-classname': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-unused-vars': 'warn',
    'react/no-unescaped-entities': 'off',
    'react/prop-types': 'off',
    'prettier/prettier': 'warn',
    'import/order': [
      1,
      {
        'newlines-between': 'always',
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'unknown',
          'object',
          'type',
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '~/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '*.css',
            group: 'object',
            position: 'after',
            patternOptions: { matchBase: true },
          },
        ],
        pathGroupsExcludedImportTypes: [],
        warnOnUnassignedImports: true,
      },
    ],
  },
};
