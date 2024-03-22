import { useContext } from "react";
import { ErrorContext } from "./ErrorContext";

export const useErrorContext = () => {
  const errorContext = useContext(ErrorContext);

  if (!errorContext) {
    throw new Error(
      "useErrorContext must be used within a ErrorContext provider"
    );
  }

  return errorContext;
};
