import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import { MarkResponseCorrectDocument } from "@generated/graphql";

export const useMarkResponseCorrectMutation = () => {
  const [markResponseCorrect, result] = useMutation(
    MarkResponseCorrectDocument
  );

  const handleMarkResponseCorrect = useCallback(
    async (id: string) => {
      await markResponseCorrect({
        variables: {
          id,
        },
      });
    },
    [markResponseCorrect]
  );

  return useMemo(
    (): [typeof handleMarkResponseCorrect, typeof result] => [
      handleMarkResponseCorrect,
      result,
    ],
    [handleMarkResponseCorrect, result]
  );
};
