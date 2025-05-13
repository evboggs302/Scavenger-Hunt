import { useController } from "react-hook-form";
import { FieldWrapper } from "@lib/components/Form/FieldWrapper";
import TextField from "@mui/material/TextField";
import { RegisterSchema } from "../../hooks/useRegisterResolver";

export const LastNameField = () => {
  const { field, fieldState } = useController<RegisterSchema, "lastName">({
    name: "lastName",
    defaultValue: "",
  });

  return (
    <FieldWrapper>
      <TextField
        required
        slotProps={{
          htmlInput: {
            "data-testid": "register-lastname",
          },
          input: {
            ref: field.ref,
          },
        }}
        name={field.name}
        value={field.value}
        onBlur={field.onBlur}
        onChange={field.onChange}
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
