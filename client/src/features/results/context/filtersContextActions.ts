import { FilterSource } from "@generated/graphql";
import { toStringEnum } from "@lib/utils/toStringEnum";

export const FILTERS_ACTION_TYPES = toStringEnum([
  "SET_CLUE_FILTER",
  "SET_TEAM_FILTER",
  "RESET_FILTERS",
]);

export const filtersContextActions = {
  setClueFilter: (clueId: string) => ({
    type: FILTERS_ACTION_TYPES.SET_CLUE_FILTER,
    payload: {
      filter: {
        source: FilterSource.Clue,
        value: clueId,
      },
    },
  }),
  setTeamFilter: (teamId: string) => ({
    type: FILTERS_ACTION_TYPES.SET_TEAM_FILTER,
    payload: {
      filter: {
        source: FilterSource.Team,
        value: teamId,
      },
    },
  }),
  resetFilters: () => ({
    type: FILTERS_ACTION_TYPES.RESET_FILTERS,
  }),
};

export type FiltersContextActions = ReturnType<
  ValueOf<typeof filtersContextActions>
>;
