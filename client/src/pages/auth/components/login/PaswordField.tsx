import { type MouseEvent, useState } from "react";
import { useController } from "react-hook-form";
import { FieldWrapper } from "@lib/components/Form/FieldWrapper";
import type { LoginSchema } from "@pages/auth/hooks/useLoginResolver";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { InputAdornment, IconButton } from "@mui/material";
import { ForgotPassword } from "./ForgotPassword";

export const PasswordField = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isDilogOpen, setIsDilogOpen] = useState(false);

  const { field, fieldState } = useController<LoginSchema, "password">({
    name: "password",
    defaultValue: "",
  });

  const toggleChangePasswordDialog = () => {
    setIsDilogOpen((val) => !val);
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <FieldWrapper>
        <TextField
          required
          {...field}
          label="Password"
          placeholder="••••••••••••"
          error={!!fieldState.error}
          helperText={fieldState.error ? fieldState.error.message : null}
          color={fieldState.error ? "error" : "primary"}
          fullWidth
          variant="outlined"
          type={showPassword ? "text" : "password"}
          slotProps={{
            htmlInput: {
              "data-testid": "login-password",
            },
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <Button
          component="button"
          type="button"
          onClick={toggleChangePasswordDialog}
          sx={{ alignSelf: "baseline" }}
        >
          Forgot your password?
        </Button>
      </FieldWrapper>
      {isDilogOpen && (
        <ForgotPassword handleClose={toggleChangePasswordDialog} />
      )}
    </>
  );
};
