import { loginMock } from "./handlers/loginMock";
import { registerMock } from "./handlers/registerMock";
import { usernameExistsMock } from "./handlers/usernameExistsMock";
import { getHuntsBuyUserIdMock } from "./handlers/getHuntsByUserMock";
import { getUserFromTokenMock } from "./handlers/getUserFromTokenMock";

export const mswHandlers = {
  registerMock,
  usernameExistsMock,
  loginMock,
  getUserFromTokenMock,
  getHuntsBuyUserIdMock,
};
