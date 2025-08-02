import { useController } from "react-hook-form";
import { FieldWrapper } from "@lib/components/Form/FieldWrapper";
import TextField from "@mui/material/TextField";
import type { RegisterSchema } from "../../hooks/useRegisterResolver";

export const UsernameField = () => {
  const { field, fieldState } = useController<RegisterSchema, "username">({
    name: "username",
    defaultValue: "",
  });

  return (
    <FieldWrapper>
      <TextField
        required
        {...field}
        slotProps={{
          htmlInput: {
            "data-testid": "register-username",
          },
        }}
        label="Username"
        placeholder="bob123"
        error={!!fieldState.error}
        helperText={fieldState.error ? fieldState.error.message : null}
        color={fieldState.error ? "error" : "primary"}
        fullWidth
        variant="outlined"
      />
    </FieldWrapper>
  );
};
