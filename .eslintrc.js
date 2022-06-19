module.exports = {
  'env': {
    'commonjs': true,
    'es2021': true,
    'node': true,
  },
  'extends': [
    'google',
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
  },
  'rules': {
    'max-len': ['error', {
      'code': 110,
      'ignoreComments': true,
    }],
    'no-console': ['error'],
    'key-spacing': ['error', {
      'afterColon': true,
    }],
    'new-cap': ['error', {
      'capIsNewExceptions': ['Router'],
    }],
  },
};
