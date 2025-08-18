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
import { fetchDefaultPaymentMethodHandler } from "./handlers/accounts/fetchDefaultPaymentMethodHandler";
import { fetchAccountTransationsHandler } from "./handlers/accounts/fetchAccountTransationsHandler";
import { cancelSubscriptionHandler } from "./handlers/accounts/cancelSubscriptionHandler";
import { getHuntResultsMock } from "./handlers/results/getHuntResultsMock";

export const mswHandlers = {
  // AUTH
  loginMock,
  logoutMock,
  registerMock,
  usernameExistsMock,
  // USER
  getUserFromTokenMock,
  // ACCOUNTS
  cancelSubscriptionHandler,
  fetchAccountTransationsHandler,
  fetchDefaultPaymentMethodHandler,
  // HUNTS
  getHuntMock,
  createHuntMock,
  getHuntsBuyUserIdMock,
  // CLUES
  getOrderedCluesMock,
  createSingleClueMock,
  createMultipleCluesMock,
  // RESPONSES
  getResponseCountMock,
  getAllResponsesByHuntMock,
  // RESULTS
  getHuntResultsMock,
};

export const mswHandlersList = Object.values(mswHandlers);
