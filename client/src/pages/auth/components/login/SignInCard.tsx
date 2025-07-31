import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { ApolloError } from "@apollo/client";
import { GoogleIcon, FacebookIcon } from "@lib/components/Auth/CustomIcons";
import { useLoginMutation } from "@pages/auth/hooks/useLoginMutation";
import {
  type LoginSchema,
  useLoginResolver,
} from "@pages/auth/hooks/useLoginResolver";
import { AuthCardContainer, AuthCard } from "../authLayout";
import { TryAgainAlert } from "@lib/components/Alerts/TryAgainAlert";
import { UsernameField } from "./UsernameField";
import { PasswordField } from "./PaswordField";

// import { Link } from "react-router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

type Inputs = LoginSchema & {
  onSubmitError?: string;
};

export const SignInCard = () => {
  const [loginMutation, { loading }] = useLoginMutation();
  const [resolver] = useLoginResolver();

  const methods = useForm<Inputs>({
    mode: "onTouched",
    resolver,
  });

  const {
    reset,
    trigger,
    setError,
    clearErrors,
    handleSubmit,
    formState: {
      isValid,
      errors: { onSubmitError },
    },
  } = methods;

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
    <FormProvider {...methods}>
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
            <UsernameField />
            <PasswordField />
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
            {/* <Typography sx={{ textAlign: "center" }}>
              Don&apos;t have an account?{" "}
              <span>
                <Link to="/register" style={{ alignSelf: "center" }}>
                  Sign up
                </Link>
              </span>
            </Typography> */}
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
    </FormProvider>
  );
};
