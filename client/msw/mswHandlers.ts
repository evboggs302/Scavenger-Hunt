import { loginMock } from "./handlers/loginMock";
import { registerMock } from "./handlers/registerMock";
import { usernameExistsMock } from "./handlers/usernameExistsMock";
import { getHuntsBuyUserIdMock } from "./handlers/getHuntsByUserMock";
import { getUserFromTokenMock } from "./handlers/getUserFromTokenMock";
import { getHuntMock } from "./handlers/getHuntMock";
import { getOrderedCluesMock } from "./handlers/getOrderedCluesMock";
import { getResponseCountMock } from "./handlers/getResponseCountMock";

export const mswHandlers = {
  // AUTH
  registerMock,
  usernameExistsMock,
  loginMock,
  // USER
  getUserFromTokenMock,
  // HUNTS
  getHuntMock,
  getHuntsBuyUserIdMock,
  // TEAMS
  // CLUES
  getOrderedCluesMock,
  // RESPONSES
  getResponseCountMock,
};
