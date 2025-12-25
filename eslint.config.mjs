import babelParser from '@babel/eslint-parser';
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import { flatConfigs } from 'eslint-plugin-import';
import jest from 'eslint-plugin-jest';
import nodePlugin from 'eslint-plugin-n';
import pluginPromise from 'eslint-plugin-promise';
import globals from 'globals';

export default [
  js.configs.recommended,
  flatConfigs.recommended,
  jest.configs['flat/recommended'],
  jest.configs['flat/style'],
  nodePlugin.configs['flat/recommended-module'],
  pluginPromise.configs['flat/recommended'],
  eslintConfigPrettier,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
        ...globals.es2026
      },
      parser: babelParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        projectService: true,
        requireConfigFile: false
      }
    },
    rules: {
      'import/order': [
        1,
        { 'newlines-between': 'always', alphabetize: { order: 'asc' } }
      ],
      'import/consistent-type-specifier-style': [1, 'prefer-inline'],
      'import/extensions': [1, 'ignorePackages'],
      'import/no-useless-path-segments': 1,
      'import/group-exports': 1,
      'n/no-unsupported-features/node-builtins': 0,
      'n/no-missing-import': 2,
      'prefer-const': 1,
      'padding-line-between-statements': [1,
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['directive', 'const', 'let', 'var'], next: '*' },
        { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] }
      ],
      eqeqeq: 2
    }
  }
];
