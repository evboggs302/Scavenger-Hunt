import React from "react";
import { UseUserContextValueArgs } from "./useCreateUserContext";
import { UserContext } from "./UserContext";

export const useUserContext = (): UseUserContextValueArgs => {
  const userContext = React.useContext(UserContext);

  if (!userContext) {
    throw new Error(
      "useUserContext must be used within a UserContext provider"
    );
  }

  return userContext;
};
