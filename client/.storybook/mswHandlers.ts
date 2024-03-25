import { getUserFromTokenMock } from "./handlers/getUserFromTokenMock";
import { loginMock } from "./handlers/loginMock";

export const mswHandlers = { loginMock, getUserFromTokenMock };
