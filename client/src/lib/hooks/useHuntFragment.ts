import { useFragment } from "@apollo/client";
import { HuntFragmentDoc } from "@generated/graphql";
import { useParams } from "react-router";

export const useHuntFragment = () => {
  const { huntId } = useParams();

  const { data, complete } = useFragment({
    fragment: HuntFragmentDoc,
    from: {
      __typename: "Hunt" as const,
      _id: huntId,
    },
  });

  return { hunt: data, complete };
};
