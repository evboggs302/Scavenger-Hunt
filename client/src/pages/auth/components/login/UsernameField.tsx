import { useController } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { LoginSchema } from "@pages/auth/hooks/useLoginResolver";

export const UsernameField = () => {
  const { field, fieldState } = useController<LoginSchema, "username">({
    name: "username",
    defaultValue: "",
  });

  return (
    <TextField
      required
      slotProps={{
        htmlInput: {
          "data-testid": "login-username",
        },
        input: {
          ref: field.ref,
        },
      }}
      name={field.name}
      value={field.value}
      onBlur={field.onBlur}
      onChange={field.onChange}
      label="Username"
      placeholder="your@email.com"
      error={!!fieldState.error}
      helperText={fieldState.error ? fieldState.error.message : null}
      color={fieldState.error ? "error" : "primary"}
      fullWidth
      variant="outlined"
    />
  );
};
