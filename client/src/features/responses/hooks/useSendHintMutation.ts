import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import { SendHintDocument } from "@generated/graphql";
import { useToast } from "@lib/hooks/useToast";

export const useSendHintMutation = () => {
  const [toast] = useToast();

  const [sendHint, result] = useMutation(SendHintDocument, {
    onCompleted: () =>
      toast({
        variant: "success",
        message: "Hint was sent successfully!",
      }),
    onError: () =>
      toast({
        variant: "error",
        message: "Unable to send hint at this time.",
      }),
  });

  const handleSendHint = useCallback(
    async ({
      message,
      res_id,
      team_id,
    }: {
      message: string;
      res_id: string;
      team_id: string;
    }) => {
      await sendHint({
        variables: {
          input: {
            hint_body: message,
            response_id: res_id,
            team_id,
          },
        },
      });
    },
    [sendHint]
  );

  return useMemo(
    (): [typeof handleSendHint, typeof result] => [handleSendHint, result],
    [handleSendHint, result]
  );
};
