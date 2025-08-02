import { z } from "zod";
import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

export const ClueDescriptionString = z
  .string({ message: "A valid description is required." })
  .trim()
  .min(3, { message: "A minimum of 3 characters is required." })
  .max(160, { message: "A maximum of 160 characters is supported." });

const CluesFormSchema = z.object({
  cluesList: z.array(ClueDescriptionString),
});

export type CluesFormState = z.infer<typeof CluesFormSchema> & {
  onSubmitError?: string;
};

export const useCluesResolver = () => {
  const resolver = zodResolver(CluesFormSchema);

  return useMemo((): [typeof resolver] => [resolver], [resolver]);
};
