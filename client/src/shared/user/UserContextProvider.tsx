import React, { ReactNode } from "react";
import { UserContext } from "./context/UserContext";
import { useCreateUserContextValue } from "./context/useCreateUserContext";

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const contextValue = useCreateUserContextValue({
    _id: "test-id-replace-with-gql-value",
    firstName: "firstName",
    lastName: "lastName",
    userName: "userName",
  });

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
