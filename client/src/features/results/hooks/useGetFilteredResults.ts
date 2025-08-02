import { useQuery } from "@apollo/client";
import { GetReusltsDocument } from "@generated/graphql";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";
import { useFiltersContext } from "../context/useFiltersContext";

export const useGetFilteredResults = () => {
  const { hunt } = useHuntFragment();
  const {
    state: { clueFilter, teamFilter },
  } = useFiltersContext();

  const result = useQuery(GetReusltsDocument, {
    variables: {
      huntId: hunt._id || "",
      filters: [clueFilter, teamFilter].filter((fltr) => fltr !== undefined),
    },
  });

  return result;
};
