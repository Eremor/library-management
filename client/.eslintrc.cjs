module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'airbnb'
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs'
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react',
    '@typescript-eslint',
    'react-refresh'
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/jsx-indent': [2, 2],
    'react/jsx-indent-props': [2, 2],
    'indent': [2, 2],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.tsx'] }],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-unused-vars': ['warn', {
      'argsIgnorePattern': '_'
    }],
    '@typescript-eslint/no-unused-vars': ['warn', {
      'argsIgnorePattern': '_'
    }],
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'max-len': ['error', {
      'ignoreComments': true,
      'code': 100
    }],
    'no-console': ['error', {
      'allow': ['warn', 'error']
    }],
    'no-restricted-globals': 'warn',
    'no-shadow': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-param-reassign': ['error', {
      'props': false
    }]
  },
}
