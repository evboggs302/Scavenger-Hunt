import { useMemo } from "react";
import { useToastContext } from "../context/toastContext/useToastContext";

type ToastProps = {
  title?: string;
  message: string;
};

export const useToast = () => {
  const { notify } = useToastContext();

  const toastInfo = ({ title = "Info", message }: ToastProps) => {
    notify.info({
      message: title,
      description: message,
    });
  };
  const toastWarning = ({ title = "Warning", message }: ToastProps) => {
    notify.warning({
      message: title,
      description: message,
    });
  };
  const toastError = ({ title = "ERROR", message }: ToastProps) => {
    notify.error({
      message: title,
      description: message,
    });
  };
  const toastSuccess = ({ title = "Success!", message }: ToastProps) => {
    notify.success({
      message: title,
      description: message,
    });
  };

  return useMemo(
    () => ({ toastInfo, toastWarning, toastError, toastSuccess }),
    []
  );
};
