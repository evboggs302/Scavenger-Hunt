import { useQuery } from "@apollo/client";
import { GetAllResponsesByHuntIdDocument } from "@generated/graphql";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";

export const useFullResponsesByHuntQuery = () => {
  const { hunt } = useHuntFragment();
  const result = useQuery(GetAllResponsesByHuntIdDocument, {
    variables: {
      id: hunt._id || "",
    },
  });

  return result;
};
