module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['airbnb', 'standard'],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    semi: ['error', 'always'],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }
    ]
    //, 'object-shorthand': ['error', 'always'],
    // 'quote-props': ['error', 'as-needed'],
    // 'no-prototype-builtins': 'error',
    // 'prefer-object-spread': 'error',
    // 'no-array-constructor': 'error',
    // 'array-callback-return': [
    //   'error',
    //   { allowImplicit: true, checkForEach: true }
    // ],
    // 'prefer-destructuring': ['error', { object: true, array: false }],
    // 'prefer-template': 'error',
    // 'template-curly-spacing': 'error',
    // 'no-loop-func': 'error',
    // 'prefer-rest-params': 'error',
    // 'default-param-last': ['error'],
    // 'no-new-func': 'error'
  }
};
