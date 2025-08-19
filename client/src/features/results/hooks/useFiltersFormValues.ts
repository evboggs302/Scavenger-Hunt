import { useFormValues } from "@lib/hooks/useFormValues";
import type { FiltersFormState } from "../context/filtersFormResolver";

export const useFiltersFormValues = () => useFormValues<FiltersFormState>();
