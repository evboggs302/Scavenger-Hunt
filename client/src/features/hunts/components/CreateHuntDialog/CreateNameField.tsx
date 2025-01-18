import { useController } from "react-hook-form";
import { HuntNameField } from "@lib/components/HuntDialogs/HuntNameField";

export const CreateNameField = () => {
  const { field, fieldState } = useController({
    name: "name",
    defaultValue: "",
  });

  return <HuntNameField field={field} fieldState={fieldState} mode="create" />;
};
