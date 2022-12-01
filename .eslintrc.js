module.exports = {
  overrides: [
    {
      files: ['*.test.ts', '*.spec.ts', '*.e2e-spec.ts', '*.factory.ts'],
      rules: {
        'no-unused-expressions': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-function': 'off',
      },
    },
    {
      files: ['*.migration.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
};
