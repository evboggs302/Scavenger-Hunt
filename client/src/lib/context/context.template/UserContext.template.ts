import { createContext } from "react";
import { UserContextValue } from "./useCreateUserContext.template";

export const UserContext = createContext<UserContextValue | undefined>(
  undefined
);
