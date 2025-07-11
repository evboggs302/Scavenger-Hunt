import { PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const FormTestWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};
