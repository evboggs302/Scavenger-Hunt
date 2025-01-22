import { z } from "zod";
import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const ClueDescriptionString = z
  .string({ message: "A valid description is required." })
  .trim()
  .min(3, { message: "A minimum of 3 characters is required." });

const schemaSingle = z.object({
  isMulti: z.literal(false),
  description: ClueDescriptionString,
});

const schemaMultiple = z.object({
  isMulti: z.literal(true),
  cluesList: z.array(ClueDescriptionString),
});

const CreateCluesFormSchema = z.discriminatedUnion("isMulti", [
  schemaSingle,
  schemaMultiple,
]);

export type CreateCluesFormSchemaType = z.infer<typeof CreateCluesFormSchema>;

export const useCreateCluesResolver = () => {
  const resolver = zodResolver(CreateCluesFormSchema);

  return useMemo((): [typeof resolver] => [resolver], [resolver]);
};
