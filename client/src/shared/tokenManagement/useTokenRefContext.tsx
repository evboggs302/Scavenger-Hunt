import { useContext, useRef } from "react";
import { TokenContext } from "./TokenContext";

export const useTokenContext = () => {
  const tokenRefContext = useContext(TokenContext);

  if (!tokenRefContext) {
    throw new Error(
      "useTokenRefContext must be used within a TokenRefContext provider"
    );
  }

  return tokenRefContext;
};
