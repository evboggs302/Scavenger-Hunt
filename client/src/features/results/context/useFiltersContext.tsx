import { useContext } from "react";
import {
  FiltersContext,
  type FiltersContextValue,
} from "./useCreateFiltersContextValue";

export const useFiltersContext = (): FiltersContextValue => {
  const context = useContext(FiltersContext);

  if (!context) {
    throw new Error(
      "useTemplateContext must be used within a TemplateContext provider"
    );
  }

  return context;
};
