import type { ResultsFilters } from "@generated/graphql";
import type { FiltersContextActions } from "./filtersContextActions";

export type FiltersContextState = {
  clueFilter: ResultsFilters | undefined;
  teamFilter: ResultsFilters | undefined;
};

export const resultsContextReducer = (
  state: FiltersContextState,
  action: FiltersContextActions
): FiltersContextState => {
  switch (action.type) {
    case "SET_CLUE_FILTER":
      return {
        ...state,
        clueFilter: action.payload.filter,
      };
    case "SET_TEAM_FILTER":
      return {
        ...state,
        teamFilter: action.payload.filter,
      };
    case "RESET_FILTERS":
      return {
        ...state,
        clueFilter: undefined,
        teamFilter: undefined,
      };
    default:
      return state;
  }
};
