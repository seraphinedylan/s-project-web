import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import { fixupConfigRules } from '@eslint/compat';

export default [
  // Apply the configuration to JavaScript, JSX, and CommonJS files
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        module: 'readonly', // Define module as a global variable to avoid ESLint errors
      },
    },
  },
  pluginJs.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),

  {
    settings: {
      react: {
        version: 'detect', // Ajoutez cette ligne pour détecter automatiquement la version de React
      },
    },
    rules: {
      // Disable prop-types rule
      'react/prop-types': 'off',
      // Add any additional rules or overrides here
    },
  },
];
