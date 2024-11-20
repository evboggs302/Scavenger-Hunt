import React, { MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import { ApolloError } from "@apollo/client";
import {
  GoogleIcon,
  FacebookIcon,
  SitemarkIcon,
} from "@lib/components/Auth/CustomIcons";
import { ForgotPassword } from "./ForgotPassword";
import { useLoginMutation } from "./useLoginMutation";
import { useLoginResolver } from "./useLoginResolver";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { VisibilityOff, Visibility } from "@mui/icons-material";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

type Inputs = {
  username: string;
  password: string;
  onSubmitError?: string;
};

export const SignInCard = () => {
  const [isDilogOpen, setIsDilogOpen] = useState(false);
  const [loginMutation, { loading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
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
  });
  const { field: passwordField, fieldState: passwordState } = useController({
    name: "password",
    control,
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
      // await loginMutation(formData);
      throw new Error("try try try");
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
    <Card variant="outlined">
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <SitemarkIcon />
      </Box>
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}>
        Sign in
      </Typography>
      {onSubmitError && (
        <Alert severity="error">{`${onSubmitError.message} Please try again later.`}</Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          ref={usernameField.ref}
          name={usernameField.name}
          value={usernameField.value || ""}
          onBlur={usernameField.onBlur}
          onChange={usernameField.onChange}
          label="Username"
          placeholder="your@email.com"
          error={!!usernameState.error}
          helperText={usernameState.error ? usernameState.error.message : null}
          color={usernameState.error ? "error" : "primary"}
          fullWidth
          variant="outlined"
        />
        <Box sx={{ margin: "14px auto" }}>
          <TextField
            ref={passwordField.ref}
            name={passwordField.name}
            value={passwordField.value || ""}
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
                      edge="end">
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
            sx={{ alignSelf: "baseline" }}>
            Forgot your password?
          </Button>
        </Box>
        {/* <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        /> */}
        <ForgotPassword
          open={isDilogOpen}
          handleClose={closeChangePasswordDialog}
        />
        <Button
          type="submit"
          disabled={!isValid || loading}
          fullWidth
          variant="contained">
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
          startIcon={<GoogleIcon />}>
          Sign in with Google
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert("Sign in with Facebook")}
          startIcon={<FacebookIcon />}>
          Sign in with Facebook
        </Button>
      </Box>
    </Card>
  );
};
