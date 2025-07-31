import type { PropsWithChildren } from "react";
import {
  TemplateContext,
  useCreateTemplateContextValue,
} from "./useCreateTemplateContext";

export const TemplateContextProvider = ({ children }: PropsWithChildren) => {
  const contextValue = useCreateTemplateContextValue({
    _id: "test-id-replace-with-gql-value",
    firstName: "firstName",
    lastName: "lastName",
    userName: "userName",
  });

  return (
    <TemplateContext.Provider value={contextValue}>
      {children}
    </TemplateContext.Provider>
  );
};
