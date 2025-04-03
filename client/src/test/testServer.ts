import { setupServer } from "msw/node";
import { mswHandlersList } from "@msw/mswHandlers";

export const testServer = setupServer(...mswHandlersList);
