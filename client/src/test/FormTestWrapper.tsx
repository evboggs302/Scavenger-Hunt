import type { PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";

type FormTestWrapperProps = PropsWithChildren & {
  formValues?: Record<string, unknown>;
};

export const FormTestWrapper: React.FC<FormTestWrapperProps> = ({
  children,
  formValues,
}) => {
  const methods = useForm({ defaultValues: formValues });
  return <FormProvider {...methods}>{children}</FormProvider>;
};
