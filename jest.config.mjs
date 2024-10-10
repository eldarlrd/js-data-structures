/** @type {import('jest').Config} */

// https://jestjs.io/docs/configuration
const config = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/functions/*.{js,jsx}']
};

export default config;
