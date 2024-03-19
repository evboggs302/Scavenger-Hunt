import React from "react";
import { OperationVariables, useQuery } from "@apollo/client";
import { apolloContextHeaders } from "../../apolloContextHeaders";
import { UserContext } from "./UserContext";
import { useTokenContext } from "../../tokenManagement/useTokenRefContext";
import { GetUserFromTokenDocument } from "../../../generated/graphql";

interface UserQryContextProviderProps {
  children: React.ReactNode;
}

export const UserQryContextProvider = ({
  children,
}: UserQryContextProviderProps) => {
  const { token } = useTokenContext();
  const { data, error, loading } = useQuery(GetUserFromTokenDocument, {
    variables: { tkn: token },
    context: apolloContextHeaders(),
  });

  return (
    <UserContext.Provider value={{ ...data?.getUserFromToken, error, loading }}>
      {children}
    </UserContext.Provider>
  );
};
