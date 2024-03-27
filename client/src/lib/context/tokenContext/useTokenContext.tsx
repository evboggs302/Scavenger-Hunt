import { useContext } from "react";
import { TokenContext } from "./TokenContext";

export const useTokenContext = () => {
  const tokenContext = useContext(TokenContext);

  if (!tokenContext) {
    throw new Error(
      "useTokenContext must be used within a TokenContext provider"
    );
  }

  return tokenContext;
};
