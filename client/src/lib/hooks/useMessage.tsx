import { useMemo } from "react";
import { App } from "antd";

type MessageProps = {
  duration?: number;
  message: string;
};

export const useMessage = () => {
  const { message: msg } = App.useApp();

  const messageInfo = ({ duration, message }: MessageProps) => {
    msg.info({
      content: message,
      duration,
    });
  };
  const messageWarning = ({ duration, message }: MessageProps) => {
    msg.warning({
      content: message,
      duration,
    });
  };
  const messageError = ({ duration, message }: MessageProps) => {
    msg.error({
      content: message,
      duration,
    });
  };
  const messageSuccess = ({ duration, message }: MessageProps) => {
    msg.success({
      content: message,
      duration,
    });
  };

  return useMemo(
    () => ({ messageInfo, messageWarning, messageError, messageSuccess }),
    []
  );
};
