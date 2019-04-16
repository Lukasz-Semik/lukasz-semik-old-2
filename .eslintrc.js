module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/prettier', 'prettier/vue'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'default-case': 'off',
    'max-len': [
      'error',
      {
        code: 100,
      },
    ],
    'global-require': 'off',
    'consistent-return': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state', 'accumulator'],
      },
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 3,
      },
    ],
    'vue/html-closing-bracket-newline': [
      'error',
      {
        multiline: 'always',
      },
    ],
    'vue/html-closing-bracket-spacing': 0,
    'import/prefer-default-export': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
