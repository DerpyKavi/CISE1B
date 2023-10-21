module.exports = {
    // ...other configurations
    transform: {
      '^.+\\.[jt]sx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json', // Your TypeScript config file
      },
    },
    moduleNameMapper: {
      // Handle CSS imports in your components (if needed)
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  };
  