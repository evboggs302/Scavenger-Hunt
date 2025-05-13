import { useCallback, useRef } from "react";
import { FallbackProps } from "react-error-boundary";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

type ErrorFallbackProps = FallbackProps & { message?: string };

export const ErrorFallback = ({
  message = "There was a problem. Please try again later.",
  resetErrorBoundary = () => location.reload(),
}: ErrorFallbackProps) => {
  const navigate = useNavigate();
  const canTryAgain = useRef(true);

  const goToDashboard = () => {
    navigate("/app", { replace: true });
  };

  const tryAgain = useCallback(() => {
    canTryAgain.current = false;
    resetErrorBoundary();
  }, [resetErrorBoundary]);

  return (
    <Box id="contianer">
      <Box id="image container"></Box>
      <Box id="message container">{message}</Box>
      <Box id="actions container">
        <Button onClick={goToDashboard}>Go to Dashboard</Button>
        <Button disabled={!canTryAgain} onClick={tryAgain}>
          Try again
        </Button>
      </Box>
    </Box>
  );
};
