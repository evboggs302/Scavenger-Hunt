import React, { MouseEvent, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { GoogleIcon, FacebookIcon } from "@lib/components/Auth/CustomIcons";
import { useRegisterMutation } from "../../hooks/useRegisterMutation";
import { useRegisterResolver } from "../../hooks/useRegisterResolver";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import { ApolloError } from "@apollo/client";
import Alert from "@mui/material/Alert";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { InputAdornment, IconButton } from "@mui/material";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
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

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

type Inputs = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
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
  });
  const { field: passwordField, fieldState: passwordState } = useController({
    name: "password",
    control,
  });
  const { field: firstNameField, fieldState: firstNameState } = useController({
    name: "firstName",
    control,
  });
  const { field: lastNameField, fieldState: lastNameState } = useController({
    name: "lastName",
    control,
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
      // await registerMutation(formData);
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
    <SignUpContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <Typography
          data-testid="register-title"
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}>
          Sign up
        </Typography>
        {onSubmitError && (
          <Alert severity="error">{`${onSubmitError.message} Please try again later.`}</Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            data-testid="register-username"
            ref={usernameField.ref}
            name={usernameField.name}
            value={usernameField.value || ""}
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
          <Box sx={{ margin: "14px auto" }}>
            <TextField
              data-testid="register-password"
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
          </Box>
          <Box sx={{ margin: "14px auto" }}>
            <TextField
              data-testid="register-firstname"
              ref={firstNameField.ref}
              name={firstNameField.name}
              value={firstNameField.value || ""}
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
          </Box>
          <Box sx={{ margin: "14px auto" }}>
            <TextField
              data-testid="register-lastname"
              ref={lastNameField.ref}
              name={lastNameField.name}
              value={lastNameField.value || ""}
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
          </Box>
          {/* <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I want to receive updates via email."
          /> */}
          <Button
            data-testid="register-submit"
            type="submit"
            disabled={!isValid || loading}
            fullWidth
            variant="contained">
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
            startIcon={<GoogleIcon />}>
            Sign up with Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert("Sign up with Facebook")}
            startIcon={<FacebookIcon />}>
            Sign up with Facebook
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ alignSelf: "center" }}>
              Sign in
            </Link>
          </Typography>
        </Box>
      </Card>
    </SignUpContainer>
  );
};
