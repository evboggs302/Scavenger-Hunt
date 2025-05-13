import { useController } from "react-hook-form";
import { FieldWrapper } from "@lib/components/Form/FieldWrapper";
import TextField from "@mui/material/TextField";
import { RegisterSchema } from "../../hooks/useRegisterResolver";

export const UsernameField = () => {
  const { field, fieldState } = useController<RegisterSchema, "username">({
    name: "username",
    defaultValue: "",
  });

  return (
    <FieldWrapper>
      <TextField
        required
        slotProps={{
          htmlInput: {
            ref: field.ref,
            "data-testid": "register-username",
          },
        }}
        name={field.name}
        value={field.value}
        onBlur={field.onBlur}
        onChange={field.onChange}
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
