import { z } from "zod";
import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const BaseSchema = z.object({
  isMulti: z.boolean().default(false),
});

const ClueItemZodObj = z.object({
  orderNumber: z.number(),
  description: z
    .string({ message: "A valid description is required." })
    .trim()
    .min(5, { message: "A valid description is required." }),
});

const schemaSingle = BaseSchema.merge(
  z.object({
    isMulti: z.literal(false),
    clueItem: ClueItemZodObj,
  })
);

const schemaMultiple = BaseSchema.merge(
  z.object({
    isMulti: z.literal(true),
    cluesList: z.array(ClueItemZodObj),
  })
);

const CreateCluesFormSchema = z.discriminatedUnion("isMulti", [
  schemaSingle,
  schemaMultiple,
]);

export type CreateCluesFormSchemaType = z.infer<typeof CreateCluesFormSchema>;

export const useCreateCluesResolver = () => {
  const resolver = zodResolver(CreateCluesFormSchema);

  return useMemo((): [typeof resolver] => [resolver], [resolver]);
};
