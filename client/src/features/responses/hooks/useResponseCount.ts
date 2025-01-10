import { useQuery } from "@apollo/client";
import { useApolloContextHeaders } from "@apolloClient/useApolloContextHeaders";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";
import { GetResponseCountByHuntIdDocument } from "@generated/graphql";

export const useResponseCount = () => {
  const headers = useApolloContextHeaders();
  const { hunt } = useHuntFragment();
  const {
    data: responses,
    error,
    loading,
  } = useQuery(GetResponseCountByHuntIdDocument, {
    context: headers,
    fetchPolicy: "cache-first",
    variables: { id: hunt._id || "" },
  });

  return { count: responses?.result.count || 0, error, loading };
};
