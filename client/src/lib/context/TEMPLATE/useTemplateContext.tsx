import { useContext } from "react";
import {
  TemplateContext,
  TemplateContextValue,
} from "./useCreateTemplateContext";

export const useTemplateContext = (): TemplateContextValue => {
  const templateContext = useContext(TemplateContext);

  if (!templateContext) {
    throw new Error(
      "useTemplateContext must be used within a TemplateContext provider"
    );
  }

  return templateContext;
};
