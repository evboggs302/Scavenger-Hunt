import { cleanup } from "@testing-library/react";
import { mockServer } from "./src/testUtils/utils/mswServer";
import { expect, afterEach, beforeAll, afterAll } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

// Start worker before all tests
beforeAll(async () => {
  mockServer.listen();
});

//  Close worker after all tests
afterAll(() => {
  mockServer.close();
});

// Reset handlers after each test `important for test isolation`
afterEach(() => {
  mockServer.resetHandlers();
});
