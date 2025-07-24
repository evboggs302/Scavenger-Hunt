import { useCallback, useEffect, useState } from "react";
import { FallbackProps } from "react-error-boundary";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { LogUtility } from "@lib/utils/LogUtility";

type ErrorFallbackProps = FallbackProps & { message?: string };

export const ErrorFallback = ({
  error,
  message = "There was a problem. Please try again later.",
  resetErrorBoundary = () => location.reload(),
}: ErrorFallbackProps) => {
  const navigate = useNavigate();
  const [canTryAgain, setCanTryAgain] = useState(true);

  const goToDashboard = () => {
    navigate("/app", { replace: true });
  };

  useEffect(() => {
    LogUtility.error(error);
  }, [error]);

  const tryAgain = useCallback(() => {
    setCanTryAgain(false);
    resetErrorBoundary();
  }, [resetErrorBoundary]);

  return (
    <Box id="contianer">
      <Box data-testid="fallback-image"></Box>
      <Box data-testid="fallback-message">{message}</Box>
      <Box data-testid="fallback-actions">
        <Button data-testid="fallback-navigate" onClick={goToDashboard}>
          Go to Dashboard
        </Button>
        <Button
          data-testid="fallback-try-again"
          disabled={!canTryAgain}
          onClick={tryAgain}
        >
          Try again
        </Button>
      </Box>
    </Box>
  );
};
