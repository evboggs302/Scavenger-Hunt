import { z } from "zod";
import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClueDescriptionString } from "./useCreateCluesResolver";

const EditCLueFormSchema = z.object({
  description: ClueDescriptionString,
});

export type EditClueFormState = z.infer<typeof EditCLueFormSchema> & {
  onSubmitError?: string;
};

export const useEditClueResolver = () => {
  const resolver = zodResolver(EditCLueFormSchema);

  return useMemo((): [typeof resolver] => [resolver], [resolver]);
};
