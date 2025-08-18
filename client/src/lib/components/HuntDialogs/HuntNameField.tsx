import { FieldWrapper } from "../Form/FieldWrapper";
import TextField from "@mui/material/TextField";
import { useController } from "react-hook-form";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";
import type { BaseHuntFormSchema } from "@lib/model/baseHuntSchema";

type HuntNameFieldProps = {
  mode: "create" | "update";
};

export const HuntNameField = ({ mode }: HuntNameFieldProps) => {
  const { hunt } = useHuntFragment();
  const { field, fieldState } = useController<BaseHuntFormSchema, "name">({
    name: "name",
    defaultValue: mode === "create" ? "" : hunt.name || "",
  });

  return (
    <FieldWrapper>
      <TextField
        slotProps={{
          htmlInput: {
            "data-testid": `${mode}-hunt-name`,
          },
        }}
        label="Hunt name"
        {...field}
        placeholder={`"Smith family reunion 2020"`}
        error={!!fieldState.error}
        helperText={fieldState.error ? fieldState.error.message : null}
        color={fieldState.error ? "error" : "primary"}
        fullWidth
        variant="outlined"
      />
    </FieldWrapper>
  );
};
