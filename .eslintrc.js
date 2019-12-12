module.exports = {
  'extends': 'airbnb',
  'parser': 'babel-eslint',
  'env': {
    'jest': true,
  },
  'rules': {
    'no-use-before-define': 'off',
    "prefer-destructuring": ["error", {
      "AssignmentExpression": {
      "array": false,
      "object": false
      }
    }],
    'react/jsx-filename-extension': 'off',
    "react/prefer-stateless-function": [1, { "ignorePureComponents": true}],
    'react/prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'comma-dangle': 'off'
  },
  'globals': {
    "fetch": false
  }
}
