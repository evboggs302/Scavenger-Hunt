import { MouseEvent, useState } from "react";
import { Link } from "react-router";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import { ApolloError } from "@apollo/client";
import { GoogleIcon, FacebookIcon } from "@lib/components/Auth/CustomIcons";
import { ForgotPassword } from "./ForgotPassword";
import { useLoginMutation } from "@pages/auth/hooks/useLoginMutation";
import {
  LoginSchema,
  useLoginResolver,
} from "@pages/auth/hooks/useLoginResolver";
import { AuthCardContainer, AuthCard } from "../authLayout";
import { TryAgainAlert } from "@lib/components/Alerts/TryAgainAlert";
import { FieldWrapper } from "@lib/components/Form/FieldWrapper";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";

type Inputs = LoginSchema & {
  onSubmitError?: string;
};

export const SignInCard = () => {
  const [loginMutation, { loading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [isDilogOpen, setIsDilogOpen] = useState(false);
  const [resolver] = useLoginResolver();

  const {
    reset,
    control,
    trigger,
    setError,
    clearErrors,
    handleSubmit,
    formState: {
      isValid,
      errors: { onSubmitError },
    },
  } = useForm<Inputs>({
    mode: "onTouched",
    resolver,
  });

  const { field: usernameField, fieldState: usernameState } = useController({
    name: "username",
    control,
    defaultValue: "",
  });
  const { field: passwordField, fieldState: passwordState } = useController({
    name: "password",
    control,
    defaultValue: "",
  });

  const openChangePasswordDialog = () => {
    setIsDilogOpen(true);
  };

  const closeChangePasswordDialog = () => {
    setIsDilogOpen(false);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    clearErrors("onSubmitError");
    await trigger();

    try {
      await loginMutation(formData);
    } catch (err) {
      reset();
      if (err instanceof ApolloError) {
        setError("onSubmitError", { type: "error", message: err.message });
      } else {
        setError("onSubmitError", {
          type: "error",
          message: "An unknown error occurred.",
        });
      }
    }
  };

  return (
    <AuthCardContainer direction="column" justifyContent="space-between">
      <AuthCard variant="outlined">
        <Typography
          data-testid="login-title"
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Sign in
        </Typography>
        {onSubmitError && <TryAgainAlert message={onSubmitError.message} />}
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            required
            slotProps={{
              htmlInput: {
                "data-testid": "login-username",
              },
            }}
            inputRef={usernameField.ref}
            name={usernameField.name}
            value={usernameField.value}
            onBlur={usernameField.onBlur}
            onChange={usernameField.onChange}
            label="Username"
            placeholder="your@email.com"
            error={!!usernameState.error}
            helperText={
              usernameState.error ? usernameState.error.message : null
            }
            color={usernameState.error ? "error" : "primary"}
            fullWidth
            variant="outlined"
          />
          <FieldWrapper>
            <TextField
              required
              inputRef={passwordField.ref}
              name={passwordField.name}
              value={passwordField.value}
              onBlur={passwordField.onBlur}
              onChange={passwordField.onChange}
              label="Password"
              placeholder="••••••••••••"
              error={!!passwordState.error}
              helperText={
                passwordState.error ? passwordState.error.message : null
              }
              color={passwordState.error ? "error" : "primary"}
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
              onClick={openChangePasswordDialog}
              sx={{ alignSelf: "baseline" }}
            >
              Forgot your password?
            </Button>
          </FieldWrapper>
          {/* <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        /> */}
          <ForgotPassword
            open={isDilogOpen}
            handleClose={closeChangePasswordDialog}
          />
          <Button
            data-testid="login-submit"
            type="submit"
            disabled={!isValid || loading}
            fullWidth
            variant="contained"
            endIcon={loading && <CircularProgress size={20} />}
          >
            Sign in
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Don&apos;t have an account?{" "}
            <span>
              <Link to="/register" style={{ alignSelf: "center" }}>
                Sign up
              </Link>
            </span>
          </Typography>
        </form>
        <Divider>or</Divider>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert("Sign in with Google")}
            startIcon={<GoogleIcon />}
          >
            Sign in with Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert("Sign in with Facebook")}
            startIcon={<FacebookIcon />}
          >
            Sign in with Facebook
          </Button>
        </Box>
      </AuthCard>
    </AuthCardContainer>
  );
};
