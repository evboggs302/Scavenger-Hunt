import { z } from "zod";
import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs, { Dayjs } from "dayjs";
import utcPlugin from "dayjs/plugin/utc";

dayjs.extend(utcPlugin);

const BaseSchema = z.object({
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
});

const schemaMultipleDaysFalse = BaseSchema.merge(
  z.object({
    multipleDays: z.literal(false),
  })
);

const schemaMultipleDaysTrue = BaseSchema.merge(
  z.object({
    multipleDays: z.literal(true),
    endDate: z
      .custom<Dayjs>((val) => val instanceof dayjs, "Invalid date")
      .refine((arg) => arg.isAfter(dayjs()), "Please select a valid end date."),
  })
);

const UpdateHuntSchemaUnion = z.discriminatedUnion("multipleDays", [
  schemaMultipleDaysFalse,
  schemaMultipleDaysTrue,
]);

export type UpdateHuntFormSchema = z.infer<typeof UpdateHuntSchemaUnion>;

export const useUpdateHuntResolver = () => {
  const resolver = zodResolver(
    UpdateHuntSchemaUnion.refine(
      (data) => {
        if (data.multipleDays) {
          return data.endDate.isAfter(data.startDate);
        }
        return true;
      },
      {
        path: ["endDate"],
        message: "Please select a valid end date.",
      }
    )
  );

  return useMemo((): [typeof resolver] => [resolver], [resolver]);
};
