import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { testServer } from "./testServer";

expect.extend(matchers);

beforeAll(() => {
  testServer.listen();
});

afterEach(() => {
  cleanup();
  testServer.resetHandlers();
});

afterAll(() => {
  testServer.close();
});
