import type { PropsWithChildren } from "react";
import {
  useCreateFiltersContextValue,
  FiltersContext,
} from "./useCreateFiltersContextValue";

export const FiltersContextProvider = ({ children }: PropsWithChildren) => {
  const contextValue = useCreateFiltersContextValue();

  return (
    <FiltersContext.Provider value={contextValue}>
      {children}
    </FiltersContext.Provider>
  );
};
