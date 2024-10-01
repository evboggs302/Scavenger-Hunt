import { notification } from "antd";
import { NotificationInstance } from "antd/es/notification/interface";
import React, { PropsWithChildren, createContext, useContext } from "react";

export type ToastContextType = {
  notify: NotificationInstance;
};

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export const ToastContextProvider = ({ children }: PropsWithChildren) => {
  const [notify, contextHolder] = notification.useNotification({
    maxCount: 5,
    placement: "topRight",
  });

  const contextValue = {
    notify,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {contextHolder}
      {children}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);

  if (!context || !context.notify) {
    throw new Error(
      "useToastContext must be used within a ToastContext provider"
    );
  }

  return context;
};
