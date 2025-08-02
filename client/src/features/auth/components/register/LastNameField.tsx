import { useController } from "react-hook-form";
import { FieldWrapper } from "@lib/components/Form/FieldWrapper";
import TextField from "@mui/material/TextField";
import type { RegisterSchema } from "../../hooks/useRegisterResolver";

export const LastNameField = () => {
  const { field, fieldState } = useController<RegisterSchema, "lastName">({
    name: "lastName",
    defaultValue: "",
  });

  return (
    <FieldWrapper>
      <TextField
        required
        {...field}
        slotProps={{
          htmlInput: {
            "data-testid": "register-lastname",
          },
        }}
        label="Last name"
        placeholder="Enter your last name"
        error={!!fieldState.error}
        helperText={fieldState.error ? fieldState.error.message : null}
        color={fieldState.error ? "error" : "primary"}
        fullWidth
        variant="outlined"
      />
    </FieldWrapper>
  );
};
