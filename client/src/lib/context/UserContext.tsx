import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
} from "react";
import {
  GetUserFromTokenDocument,
  GetUserFromTokenQuery,
  GetUserFromTokenQueryVariables,
} from "@generated/graphql";
import { QueryResult, useQuery } from "@apollo/client";
import { useNavigate } from "react-router";

export type UserContextValue = QueryResult<
  GetUserFromTokenQuery,
  GetUserFromTokenQueryVariables
>;

export const UserContext = createContext<UserContextValue | undefined>(
  undefined
);

export const UserQryContextProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();

  const onErrorCallback = useCallback(() => {
    localStorage.removeItem("BEARER_TOKEN");
    return navigate("/login", { replace: true });
  }, [navigate]);

  const result = useQuery(GetUserFromTokenDocument, {
    pollInterval: 30_000,
    onError: onErrorCallback,
  });

  return <UserContext.Provider value={result}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      "useUserContext must be used within a UserQryContextProvider"
    );
  }

  return context;
};
