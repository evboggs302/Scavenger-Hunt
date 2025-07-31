import { useSnackbar, type VariantType } from "notistack";
import { useCallback, useId } from "react";

type UseToastProps = {
  message?: string;
  variant?: VariantType;
};

export const useToast = () => {
  const hookId = useId();
  const { enqueueSnackbar } = useSnackbar();

  const toast = useCallback(
    ({
      variant = "default",
      message = "Uh oh! An error ocurred. Please try again later.",
      ...props
    }: UseToastProps = {}) => {
      return enqueueSnackbar({
        ...props,
        key: hookId,
        message,
        variant,
        autoHideDuration: variant === "error" ? 8_000 : undefined,
      });
    },
    [enqueueSnackbar, hookId]
  );

  return [toast];
};
