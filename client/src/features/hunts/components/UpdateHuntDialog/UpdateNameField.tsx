import { useController } from "react-hook-form";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";
import { HuntNameField } from "@lib/components/HuntDialogs/HuntNameField";

export const UpdateNameField = () => {
  const { hunt } = useHuntFragment();
  const { field, fieldState } = useController({
    name: "name",
    defaultValue: hunt.name,
  });

  return <HuntNameField field={field} fieldState={fieldState} mode="update" />;
};
