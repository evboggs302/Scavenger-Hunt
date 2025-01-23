import { z } from "zod";
import { useMemo } from "react";
import validator from "validator";
import { zodResolver } from "@hookform/resolvers/zod";

const TeamZodObj = z.object({
  team: z.object({
    members: z.string().min(3, "Must have at least 3 characters"),
    device_number: z
      .string()
      .refine(
        (phone) => validator.isMobilePhone(phone, "en-US"),
        "Invalid U.S. phone number."
      ),
  }),
});

export type UpdateTeamFormSchemaType = z.infer<typeof TeamZodObj> & {
  onSubmitError?: string;
};

export const useUpdateTeamResolver = () => {
  const resolver = zodResolver(TeamZodObj);

  return useMemo((): [typeof resolver] => [resolver], [resolver]);
};
