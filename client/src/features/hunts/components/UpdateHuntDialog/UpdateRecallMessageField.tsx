import { useController } from "react-hook-form";
import { RecallMessageField } from "@lib/components/HuntDialogs/RecallMessageField";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";

export const UpdateRecallMessageField = () => {
  const { hunt } = useHuntFragment();
  const { field, fieldState } = useController({
    name: "recallMessage",
    defaultValue: hunt.recall_message,
  });

  return (
    <RecallMessageField field={field} fieldState={fieldState} mode="update" />
  );
};
