// eslint.config.js
const security = require('eslint-plugin-security');
const noUnsanitized = require('eslint-plugin-no-unsanitized');
const tsParser = require('@typescript-eslint/parser');

module.exports = [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module'
      }
    },
    plugins: {
      security: security,
      'no-unsanitized': noUnsanitized
    },
    rules: {
      // Reglas de seguridad XSS
      'no-unsanitized/method': 'error',
      'no-unsanitized/property': 'error',
      'no-eval': 'error',
      'security/detect-eval-with-expression': 'error',
      'security/detect-object-injection': 'warn',
      'security/detect-non-literal-regexp': 'warn',
      'security/detect-unsafe-regex': 'error'
    }
  }
];