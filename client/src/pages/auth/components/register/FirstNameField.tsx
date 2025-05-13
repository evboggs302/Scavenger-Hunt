import { useController } from "react-hook-form";
import { FieldWrapper } from "@lib/components/Form/FieldWrapper";
import TextField from "@mui/material/TextField";
import { RegisterSchema } from "../../hooks/useRegisterResolver";

export const FirstNameField = () => {
  const { field, fieldState } = useController<RegisterSchema, "firstName">({
    name: "firstName",
    defaultValue: "",
  });

  return (
    <FieldWrapper>
      <TextField
        required
        slotProps={{
          htmlInput: {
            "data-testid": "register-firstname",
          },
          input: {
            ref: field.ref,
          },
        }}
        name={field.name}
        value={field.value}
        onBlur={field.onBlur}
        onChange={field.onChange}
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
