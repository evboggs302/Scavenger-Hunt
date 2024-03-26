import { getUserFromTokenMock } from "./handlers/getUserFromTokenMock";
import { loginMock } from "./handlers/loginMock";
import { registerMock } from "./handlers/registerMock";
import { usernameExistsMock } from "./handlers/usernameExistsMock";

export const mswHandlers = {
  loginMock,
  getUserFromTokenMock,
  registerMock,
  usernameExistsMock,
};
