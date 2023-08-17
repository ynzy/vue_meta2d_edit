/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/eslint-config-typescript', '@vue/eslint-config-prettier/skip-formatting', './.eslintrc-auto-import.json'],
  globals: {
    meta2d: true
  },
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'vue/multi-word-component-names': [
      'off',
      {
        ignores: ['Main']
      }
    ],
    'prettier/prettier': 'off',
    'prefer-const': 'off', //强制将let转化为const
    // 强制 error
    // indent: ['error', 4, { SwitchCase: 1 }],
    // 'vue/html-indent': ['error', 4],
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'error',
    // 推荐 warn
    // 'max-len': ['warn', { 'code': 200 }],
    'vue/html-quotes': 'warn',
    'linebreak-style': [0, 'error', 'windows'],
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'no-unused-vars': 'off', // 没有使用的变量
    'no-plusplus': 'off',
    'comma-spacing': 'off',
    eqeqeq: 'off',
    'key-spacing': 'off',
    'no-unused-expressions': ['off', { allowShortCircuit: true }]
  }
};
