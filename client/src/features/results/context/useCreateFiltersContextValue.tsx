import { createContext, useMemo, useReducer } from "react";
import {
  resultsContextReducer,
  type FiltersContextState,
} from "./resultsContextReducer";
import { filtersContextActions } from "./filtersContextActions";
import { bindActionCreators } from "@lib/utils/bindActionCreators";

export interface FiltersContextValue {
  state: FiltersContextState;
  actions: ReturnType<typeof useContextReducer>["actions"];
}

export const FiltersContext = createContext<FiltersContextValue | undefined>(
  undefined
);

export const useContextReducer = () => {
  const defaultState: FiltersContextState = {
    clueFilter: undefined,
    teamFilter: undefined,
  };

  const [state, dispatch] = useReducer(resultsContextReducer, defaultState);

  const actions = useMemo(
    () => bindActionCreators(filtersContextActions, dispatch),
    [dispatch]
  );

  return useMemo(() => ({ state, actions }), [state, actions]);
};

export const useCreateFiltersContextValue = (): FiltersContextValue => {
  const reducer = useContextReducer();

  return useMemo(() => ({ ...reducer }), [reducer]);
};
