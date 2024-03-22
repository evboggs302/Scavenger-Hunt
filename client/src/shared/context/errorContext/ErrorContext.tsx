import React, { PropsWithChildren, createContext, useState } from "react";

export type ErrorContextType = {
  error: Record<string, any>;
  setError: React.Dispatch<React.SetStateAction<Record<string, any>>>;
};

export const ErrorContext = createContext<ErrorContextType>({
  error: {},
  setError: () => {},
});

export const ErrorContextProvider = ({ children }: PropsWithChildren) => {
  const [error, setError] = useState({});
  const contextValue = {
    error,
    setError,
  };

  return (
    <ErrorContext.Provider value={contextValue}>
      {children}
    </ErrorContext.Provider>
  );
};
