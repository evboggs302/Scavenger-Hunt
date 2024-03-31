import { useContext } from "react";
import { ToastContext } from "./ToastContext";

export const useToastContext = () => {
  const context = useContext(ToastContext);

  if (!context || !context.notify) {
    throw new Error(
      "useToastContext must be used within a ToastContext provider"
    );
  }

  return context;
};
