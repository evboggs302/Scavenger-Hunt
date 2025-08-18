import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";

const ResultsFiltersSchema = z.object({
  clueFilter: z.array(z.string()),
  teamFilter: z.array(z.string()),
});

export type FiltersFormState = z.infer<typeof ResultsFiltersSchema>;

export const defaultFiltersFormState: FiltersFormState = {
  clueFilter: [],
  teamFilter: [],
};

export const useFiltersResolver = () => {
  const resolver = zodResolver(ResultsFiltersSchema);

  return useMemo((): [typeof resolver] => [resolver], [resolver]);
};
