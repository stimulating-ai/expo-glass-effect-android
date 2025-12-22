module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testMatch: ['**/__tests__/**/*.test.(ts|tsx|js)'],
  testPathIgnorePatterns: ['/node_modules/', '/build/', '/plugin/'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|expo-modules-core)/)',
  ],
  setupFilesAfterEnv: ['@testing-library/react-native/extend-expect'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/__tests__/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  moduleNameMapper: {
    '^expo-modules-core$': '<rootDir>/src/__mocks__/expo-modules-core.ts',
  },
};
