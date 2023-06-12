import React from "react";
import { UserContextValue } from "./useCreateUserContext";

export const UserContext =
  React.createContext<UserContextValue | undefined>(undefined);
