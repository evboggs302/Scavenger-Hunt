import { z } from "zod";
import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const ClueDescriptionString = z
  .string({ message: "A valid description is required." })
  .trim()
  .min(3, { message: "A minimum of 3 characters is required." });

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
