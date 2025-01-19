import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export type TokenContextType = {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
};

export const TokenContext = createContext<TokenContextType | undefined>(
  undefined
);

export const TokenContextProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState(localStorage.getItem("BEARER_TOKEN"));
  const contextValue = {
    token,
    setToken,
  };

  return (
    <TokenContext.Provider value={contextValue}>
      {children}
    </TokenContext.Provider>
  );
};

export const useTokenContext = () => {
  const tokenContext = useContext(TokenContext);

  if (!tokenContext) {
    throw new Error(
      "useTokenContext must be used within a TokenContext provider"
    );
  }

  return tokenContext;
};
