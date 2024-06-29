import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  roots: [
    "./",
    "test/"
  ],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  }
};

export default config;