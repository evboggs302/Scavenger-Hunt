import { useController } from "react-hook-form";
import { FieldWrapper } from "@lib/components/Form/FieldWrapper";
import TextField from "@mui/material/TextField";
import { RegisterSchema } from "../../hooks/useRegisterResolver";

export const UsernameField = () => {
  const { field, fieldState } = useController<RegisterSchema, "email">({
    name: "email",
    defaultValue: "",
  });

  return (
    <FieldWrapper>
      <TextField
        required
        slotProps={{
          htmlInput: {
            "data-testid": "register-email",
          },
        }}
        inputRef={field.ref}
        name={field.name}
        value={field.value}
        onBlur={field.onBlur}
        onChange={field.onChange}
        label="Email"
        placeholder="your@email.com"
        error={!!fieldState.error}
        helperText={fieldState.error ? fieldState.error.message : null}
        color={fieldState.error ? "error" : "primary"}
        fullWidth
        variant="outlined"
      />
    </FieldWrapper>
  );
};
