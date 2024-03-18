import React, {
  PropsWithChildren,
  createContext,
  createRef,
  useContext,
  useImperativeHandle,
  useState,
} from "react";

export type TokenContextType = {
  token: string;
  setToken: (tkn: string) => void;
};

// export const TokenContextRef = createRef<TokenContextType>();

export const TokenContext = createContext({
  token: "",
  setToken: (tkn: string) => {},
});

export const TokenContextProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState("");

  const contextValue = {
    token,
    setToken,
  };
  // useImperativeHandle(TokenContextRef, () => contextValue);
  return (
    <TokenContext.Provider value={contextValue}>
      {children}
    </TokenContext.Provider>
  );
};
