import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useRegisterMutation } from "@pages/auth/hooks/useRegisterMutation";
import {
  RegisterSchema,
  useRegisterResolver,
} from "@pages/auth/hooks/useRegisterResolver";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ApolloError } from "@apollo/client";
import { CircularProgress } from "@mui/material";
import { AuthCardContainer, AuthCard } from "../authLayout";
import { TryAgainAlert } from "@lib/components/Alerts/TryAgainAlert";
import { FirstNameField } from "./FirstNameField";
import { UsernameField } from "./UsernameField";
import { PasswordField } from "./PasswordField";
import { LastNameField } from "./LastNameField";
import { SignUpAlternates } from "./SignUpAlternates";

type Inputs = RegisterSchema & {
  onSubmitError?: string;
};

export const SignUpCard = () => {
  const [registerMutation, { loading }] = useRegisterMutation();
  const [resolver] = useRegisterResolver();

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
      await registerMutation(formData);
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
            data-testid="register-title"
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign up
          </Typography>
          {onSubmitError && <TryAgainAlert message={onSubmitError.message} />}
          <form onSubmit={handleSubmit(onSubmit)}>
            <UsernameField />
            <PasswordField />
            <FirstNameField />
            <LastNameField />
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
          <SignUpAlternates />
        </AuthCard>
      </AuthCardContainer>
    </FormProvider>
  );
};
