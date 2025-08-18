import { useQuery } from "@apollo/client";
import { FilterSource, GetReusltsDocument } from "@generated/graphql";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";
import { useFiltersFormValues } from "./useFiltersFormValues";

export const useGetFilteredResults = () => {
  const { hunt } = useHuntFragment();
  const { clueFilter, teamFilter } = useFiltersFormValues();

  const clues = clueFilter.map((clu) => ({
    source: FilterSource.Clue,
    value: clu,
  }));

  const teams = teamFilter.map((clu) => ({
    source: FilterSource.Clue,
    value: clu,
  }));

  const results = useQuery(GetReusltsDocument, {
    variables: {
      huntId: hunt._id || "",
      filters: [...clues, ...teams],
    },
  });

  return results;
};
