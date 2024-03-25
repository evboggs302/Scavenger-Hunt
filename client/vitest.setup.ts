import { cleanup } from "@testing-library/react";
import { mockServer } from "./src/testUtils/utils/mswServer";
import { expect, afterEach, beforeAll, afterAll } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

// Start worker before all tests
beforeAll(async () => {
  mockServer.listen({ onUnhandledRequest: "bypass" });
});

// Reset handlers after each test `important for test isolation`
afterEach(() => {
  cleanup();
  mockServer.resetHandlers();
});

//  Close worker after all tests
afterAll(() => {
  mockServer.close();
});
