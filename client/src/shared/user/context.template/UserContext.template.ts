import React from "react";
import { UserContextValue } from "./useCreateUserContext.template";

export const UserContext = React.createContext<UserContextValue | undefined>(
  undefined
);
