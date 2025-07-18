import { FieldWrapper } from "../Form/FieldWrapper";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import {
  ControllerRenderProps,
  FieldValues,
  ControllerFieldState,
} from "react-hook-form";

type HuntNameFieldProps = {
  field: ControllerRenderProps<FieldValues, "name">;
  fieldState: ControllerFieldState;
  mode: "create" | "update";
};

export const HuntNameField = ({
  field,
  fieldState,
  mode,
}: HuntNameFieldProps) => {
  return (
    <FieldWrapper>
      <TextField
        slotProps={{
          htmlInput: {
            "data-testid": `${mode}-hunt-name`,
          },
          input: {
            ref: field.ref,
          },
        }}
        label="Hunt name"
        name={field.name}
        value={field.value}
        onBlur={field.onBlur}
        onChange={field.onChange}
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
