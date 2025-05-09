import { useContext } from "react";
import { UseUserContextValueArgs } from "./useCreateUserContext.template";
import { UserContext } from "./UserContext.template";

export const useUserContext = (): UseUserContextValueArgs => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error(
      "useUserContext must be used within a UserContext provider"
    );
  }

  return userContext;
};
