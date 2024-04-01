import { ReactNode, useMemo } from "react";
import { App } from "antd";

type ModalProps = {
  title?: string;
  content: ReactNode;
};

export const useModal = () => {
  const { modal } = App.useApp();

  const modalInfo = ({ content, title = "Modal title" }: ModalProps) => {
    modal.info({
      title,
      content,
      centered: true,
    });
  };
  const modalWarning = ({ content, title = "Modal title" }: ModalProps) => {
    modal.warning({
      title,
      content,
      centered: true,
    });
  };
  const modalError = ({ content, title = "Modal title" }: ModalProps) => {
    modal.error({
      title,
      content,
      centered: true,
    });
  };
  const modalSuccess = ({ content, title = "Modal title" }: ModalProps) => {
    modal.success({
      title,
      content,
      centered: true,
    });
  };
  const modalConfirm = ({ content, title = "Modal title" }: ModalProps) => {
    modal.confirm({
      title,
      content,
      centered: true,
    });
  };

  return useMemo(
    () => ({
      modalInfo,
      modalWarning,
      modalError,
      modalSuccess,
      modalConfirm,
      modal,
    }),
    []
  );
};
