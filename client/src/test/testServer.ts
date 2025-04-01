import { setupServer } from "msw/node";
import { mswHandlers } from "@msw/mswHandlers";

const handlers = Object.values(mswHandlers);
export const testServer = setupServer(...handlers);
