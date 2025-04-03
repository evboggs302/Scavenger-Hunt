import { loginMock } from "./handlers/auth/loginMock";
import { registerMock } from "./handlers/auth/registerMock";
import { usernameExistsMock } from "./handlers/auth/usernameExistsMock";
import { getHuntsBuyUserIdMock } from "./handlers/hunts/getHuntsByUserMock";
import { getUserFromTokenMock } from "./handlers/getUserFromTokenMock";
import { getHuntMock } from "./handlers/hunts/getHuntMock";
import { getOrderedCluesMock } from "./handlers/clues/getOrderedCluesMock";
import { getResponseCountMock } from "./handlers/responses/getResponseCountMock";
import { logoutMock } from "./handlers/auth/logoutMock";
import { createHuntMock } from "./handlers/hunts/createHuntMock";
import { createSingleClueMock } from "./handlers/clues/createSingleClueMock";
import { createMultipleCluesMock } from "./handlers/clues/createMultipleCluesMock";
import { getAllResponsesByHuntMock } from "./handlers/responses/getAllResponsesByHuntMock";

export const mswHandlers = {
  // AUTH
  loginMock,
  logoutMock,
  registerMock,
  usernameExistsMock,
  // CLUES
  getOrderedCluesMock,
  createSingleClueMock,
  createMultipleCluesMock,
  // HUNTS
  getHuntMock,
  createHuntMock,
  getHuntsBuyUserIdMock,
  // RESPONSES
  getResponseCountMock,
  getAllResponsesByHuntMock,
  // USER
  getUserFromTokenMock,
};

export const mswHandlersList = Object.values(mswHandlers);
