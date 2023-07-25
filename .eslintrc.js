process.env.ESLINT_TSCONFIG = 'tsconfig.json'

module.exports = {
  extends: '@antfu',
  rules: {
    'no-console': 'off',
  },
  globals: {
    Kakao: true,
  },
}
