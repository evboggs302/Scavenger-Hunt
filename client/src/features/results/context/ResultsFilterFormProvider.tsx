import type { PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  defaultFiltersFormState,
  type FiltersFormState,
  useFiltersResolver,
} from "./filtersFormResolver";

export const ResultsFilterFormProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [resolver] = useFiltersResolver();

  const methods = useForm<FiltersFormState>({
    mode: "all",
    resolver,
    defaultValues: defaultFiltersFormState,
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};
