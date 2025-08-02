import { useController } from "react-hook-form";
import TextField from "@mui/material/TextField";
import type { LoginSchema } from "@features/auth/hooks/useLoginResolver";

export const UsernameField = () => {
  const { field, fieldState } = useController<LoginSchema, "username">({
    name: "username",
    defaultValue: "",
  });

  return (
    <TextField
      required
      {...field}
      slotProps={{
        htmlInput: {
          "data-testid": "login-username",
        },
      }}
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
