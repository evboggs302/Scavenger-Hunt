import { z } from "zod";
import { useMemo } from "react";
import validator from "validator";
import { zodResolver } from "@hookform/resolvers/zod";

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

const CreateTeamsFormSchema = z.object({
  teams: z.array(TeamZodObj),
});

export type CreateTeamsFormSchemaType = z.infer<
  typeof CreateTeamsFormSchema
> & { onSubmitError?: string };

export const useCreateTeamsResolver = () => {
  const resolver = zodResolver(CreateTeamsFormSchema);

  return useMemo((): [typeof resolver] => [resolver], [resolver]);
};
