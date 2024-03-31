import React, { PropsWithChildren, createContext, useState } from "react";

export type TokenContextType = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export const TokenContext = createContext<TokenContextType>({
  token: null,
  setToken: () => {},
});

export const TokenContextProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState(
    localStorage.getItem("BEARER_TOKEN") || null
  );
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
