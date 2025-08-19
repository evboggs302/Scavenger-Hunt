import { z } from "zod";
import dayjs, { Dayjs } from "dayjs";
import utcPlugin from "dayjs/plugin/utc";

dayjs.extend(utcPlugin);

export const BaseSchema = z.object({
  name: z
    .string({ message: "A valid name is required." })
    .trim()
    .min(5, { message: "A valid name is required." }),
  recallMessage: z
    .string({ message: "A valid recall message is required." })
    .trim()
    .min(8, { message: "A valid recall message is required." })
    .optional(),
  startDate: z
    .custom<Dayjs>((val) => val instanceof dayjs)
    .refine(
      (arg) => arg.isAfter(dayjs().subtract(1, "day")),
      "Please select a valid start date."
    ),
  onSubmitError: z.string().optional(),
});

export type BaseHuntFormSchema = z.infer<typeof BaseSchema>;
