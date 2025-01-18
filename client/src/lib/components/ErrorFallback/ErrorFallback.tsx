import { useCallback, useRef } from "react";
import { FallbackProps } from "react-error-boundary";
import { useNavigate } from "react-router";

type ErrorFallbackProps = FallbackProps & { message?: string };

export const ErrorFallback = ({
  // error,
  message = "There was a problem. Please try again later.",
  resetErrorBoundary = () => location.reload(),
}: ErrorFallbackProps) => {
  const navigate = useNavigate();
  const canTryAgain = useRef(true);

  const goToDashboard = () =>
    navigate("/dashboard", { relative: "route", replace: true });

  const tryAgain = useCallback(() => {
    canTryAgain.current = false;
    resetErrorBoundary();
  }, [resetErrorBoundary]);

  return (
    <div id="contianer">
      <div id="image container"></div>
      <div id="message container">{message}</div>
      <div id="actions container">
        <button onClick={goToDashboard}>Go to Dashboard</button>
        <button disabled={!canTryAgain} onClick={tryAgain}>
          Try again
        </button>
      </div>
    </div>
  );
};
