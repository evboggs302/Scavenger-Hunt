import { FieldValues, useFormContext, useWatch } from "react-hook-form";

export const useFormValues = <T extends FieldValues = FieldValues>() => {
  const { getValues } = useFormContext<T>();

  return {
    ...useWatch(),
    ...getValues(),
  };
};
