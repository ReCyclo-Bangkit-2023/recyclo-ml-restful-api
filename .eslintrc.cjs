module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['unused-imports'],
  rules: {
    'no-console': 'off',
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'always',
      },
    ],
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
};
