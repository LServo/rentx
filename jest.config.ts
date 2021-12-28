// eslint-disable-next-line import/no-extraneous-dependencies
import { pathsToModuleNameMapper } from "ts-jest";

import { compilerOptions } from "./tsconfig.json";

export default {
    bail: false,
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ["<rootDir>/src/modules/**/useCases/**/*.ts"],
    coverageDirectory: "coverage",
    coverageReporters: ["text-summary", "lcov"],
    coverageProvider: "v8",
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: "<rootDir>/src/",
    }),
    preset: "ts-jest",
    testMatch: ["**/*.spec.ts"],
};
