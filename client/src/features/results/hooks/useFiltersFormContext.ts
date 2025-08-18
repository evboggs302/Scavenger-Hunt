import { useFormContext } from "react-hook-form";
import { FiltersFormState } from "../context/filtersFormResolver";

export const useFiltersFormContext = () => useFormContext<FiltersFormState>();
