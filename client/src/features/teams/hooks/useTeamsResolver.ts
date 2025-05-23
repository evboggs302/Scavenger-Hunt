import { z } from "zod";
import { useMemo } from "react";
import validator from "validator";
import { zodResolver } from "@hookform/resolvers/zod";

const BaseSchema = z.object({
  isMulti: z.boolean().default(false),
});

const TeamZodObj = z.object({
  members: z
    .string()
    .min(3, "Must have at least 3 characters")
    .transform((str) => str.split(",").map((s) => s.trim())),
  device_number: z
    .string()
    .refine(
      (phone) => validator.isMobilePhone(phone, "en-US"),
      "Invalid U.S. phone number."
    ),
});

const schemaSingle = BaseSchema.merge(
  z.object({
    isMulti: z.literal(false),
    team: TeamZodObj,
  })
);

const schemaMultiple = BaseSchema.merge(
  z.object({
    isMulti: z.literal(true),
    teams: z.array(TeamZodObj),
  })
);

const CreateTeamsFormSchema = z.discriminatedUnion("isMulti", [
  schemaSingle,
  schemaMultiple,
]);

export type CreateTeamsFormSchemaType = z.infer<
  typeof CreateTeamsFormSchema
> & { onSubmitError?: string };

export const useTeamsResolver = () => {
  const resolver = zodResolver(CreateTeamsFormSchema);

  return useMemo((): [typeof resolver] => [resolver], [resolver]);
};
