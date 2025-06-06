module.exports = {
  extends: [
    'plugin:react/recommended',
  ],
  plugins: ["prettier"],
  rules: {
    /** We use this a lot with isDefined and hasAttributes */
    'unicorn/no-array-callback-reference': 'off',
    /** Named export is easier to refactor automatically */
    'import/prefer-default-export': 'off',
    /** Too tedious to type every function return explicitly */
    '@typescript-eslint/explicit-function-return-type': 'off',
    /** We prefer arrow functions */
    'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
    /** It's annoying to refactor from one style to another */
    'arrow-body-style': 'off',
    /** These are exceptions that we use with "__" */
    'no-underscore-dangle': [
      'error'],
    /** Useless, because it does not warn when needed, warns when not needed. */
    'no-secrets/no-secrets': 'off',
    /** Too tedious */
    'eslint-comments/disable-enable-pair': 'off',
    /** We specify default props in props decomposition */
    'react/require-default-props': 'off',
    /** This is no longer needed since React 17 */
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    /** Next Link does not need href in <a> tag */
    'jsx-a11y/anchor-is-valid': 'off',
    'pii/no-email': 'off',
    'pii/no-phone-number': 'off',
    'xss/no-mixed-html': 'off',
    'const-case/uppercase': 'off',

    'jsx-a11y/img-redundant-alt': 'warn',
    'react/jsx-no-useless-fragment': [2, { allowExpressions: true }],
    'react/display-name': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',

    /** After using the default @/* alias, we wanted to remove the “missing file extension” error message */
    'import/extensions': 'off',

    /* Formatting rules */
    'prettier/prettier': ['error', { endOfLine: 'auto' }], // TODO revisit, prettier should not be run by eslint
    'padding-line-between-statements': ['warn', { blankLine: 'always', prev: '*', next: 'return' }],
  },
  ignorePatterns: ['*.config.*', '.eslintrc.js', 'services/graphql/*'],
}