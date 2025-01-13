import { useQuery } from "@apollo/client";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";
import { GetResponseCountByHuntIdDocument } from "@generated/graphql";

export const useResponseCount = () => {
  const { hunt } = useHuntFragment();
  const {
    data: responses,
    error,
    loading,
  } = useQuery(GetResponseCountByHuntIdDocument, {
    fetchPolicy: "cache-and-network",
    variables: { id: hunt._id || "" },
  });

  return { count: responses?.result.count || 0, error, loading };
};
