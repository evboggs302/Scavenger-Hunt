import React, { MouseEvent, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link } from "react-router";
import { GoogleIcon, FacebookIcon } from "@lib/components/Auth/CustomIcons";
import { useRegisterMutation } from "@features/auth/hooks/useRegisterMutation";
import {
  RegisterSchema,
  useRegisterResolver,
} from "@features/auth/hooks/useRegisterResolver";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import { ApolloError } from "@apollo/client";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { InputAdornment, IconButton, CircularProgress } from "@mui/material";
import { AuthCardContainer, AuthCard } from "../authLayout";
import { TryAgainAlert } from "@lib/components/Alerts/TryAgainAlert";
import { FieldWrapper } from "@lib/components/Form/FieldWrapper";

type Inputs = RegisterSchema & {
  onSubmitError?: string;
};

export const SignUpCard = (props: { disableCustomTheme?: boolean }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [registerMutation, { loading }] = useRegisterMutation();
  const [resolver] = useRegisterResolver();

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
  const { field: firstNameField, fieldState: firstNameState } = useController({
    name: "firstName",
    control,
    defaultValue: "",
  });
  const { field: lastNameField, fieldState: lastNameState } = useController({
    name: "lastName",
    control,
    defaultValue: "",
  });

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
      await registerMutation(formData);
      // throw new Error("try try try");
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
          data-testid="register-title"
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Sign up
        </Typography>
        {onSubmitError && <TryAgainAlert message={onSubmitError.message} />}
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            required
            slotProps={{
              htmlInput: {
                "data-testid": "register-username",
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
                  "data-testid": "register-password",
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
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              required
              slotProps={{
                htmlInput: {
                  "data-testid": "register-firstname",
                },
              }}
              inputRef={firstNameField.ref}
              name={firstNameField.name}
              value={firstNameField.value}
              onBlur={firstNameField.onBlur}
              onChange={firstNameField.onChange}
              label="First name"
              placeholder="Enter your first name"
              error={!!firstNameState.error}
              helperText={
                firstNameState.error ? firstNameState.error.message : null
              }
              color={firstNameState.error ? "error" : "primary"}
              fullWidth
              variant="outlined"
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              required
              slotProps={{
                htmlInput: {
                  "data-testid": "register-lastname",
                },
              }}
              inputRef={lastNameField.ref}
              name={lastNameField.name}
              value={lastNameField.value}
              onBlur={lastNameField.onBlur}
              onChange={lastNameField.onChange}
              label="Last name"
              placeholder="Enter your last name"
              error={!!lastNameState.error}
              helperText={
                lastNameState.error ? lastNameState.error.message : null
              }
              color={lastNameState.error ? "error" : "primary"}
              fullWidth
              variant="outlined"
            />
          </FieldWrapper>
          {/* <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I want to receive updates via email."
          /> */}
          <Button
            data-testid="register-submit"
            type="submit"
            disabled={!isValid || loading}
            fullWidth
            variant="contained"
            endIcon={loading && <CircularProgress size={20} />}
          >
            Sign up
          </Button>
        </form>
        <Divider>
          <Typography sx={{ color: "text.secondary" }}>or</Typography>
        </Divider>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert("Sign up with Google")}
            startIcon={<GoogleIcon />}
          >
            Sign up with Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert("Sign up with Facebook")}
            startIcon={<FacebookIcon />}
          >
            Sign up with Facebook
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ alignSelf: "center" }}>
              Sign in
            </Link>
          </Typography>
        </Box>
      </AuthCard>
    </AuthCardContainer>
  );
};
