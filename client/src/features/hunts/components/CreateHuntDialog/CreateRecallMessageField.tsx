import { useController } from "react-hook-form";
import { RecallMessageField } from "@lib/components/HuntDialogs/RecallMessageField";

export const CreateRecallMessageField = () => {
  const { field, fieldState } = useController({
    name: "recallMessage",
    defaultValue: "",
  });

  return (
    <RecallMessageField field={field} fieldState={fieldState} mode="create" />
  );
};
