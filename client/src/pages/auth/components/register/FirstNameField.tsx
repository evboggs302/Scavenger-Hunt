import { useController } from "react-hook-form";
import { FieldWrapper } from "@lib/components/Form/FieldWrapper";
import TextField from "@mui/material/TextField";
import type { RegisterSchema } from "../../hooks/useRegisterResolver";

export const FirstNameField = () => {
  const { field, fieldState } = useController<RegisterSchema, "firstName">({
    name: "firstName",
    defaultValue: "",
  });

  return (
    <FieldWrapper>
      <TextField
        required
        {...field}
        slotProps={{
          htmlInput: {
            "data-testid": "register-firstname",
          },
        }}
        label="First name"
        placeholder="Enter your first name"
        error={!!fieldState.error}
        helperText={fieldState.error ? fieldState.error.message : null}
        color={fieldState.error ? "error" : "primary"}
        fullWidth
        variant="outlined"
      />
    </FieldWrapper>
  );
};
