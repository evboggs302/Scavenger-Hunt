import { z } from "zod";
import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseSchema } from "@lib/model/baseHuntSchema";
import dayjs, { Dayjs } from "dayjs";
import utcPlugin from "dayjs/plugin/utc";

dayjs.extend(utcPlugin);

const schemaMultipleDaysFalse = z.object({
  ...BaseSchema.shape,
  multipleDays: z.literal(false),
});

const schemaMultipleDaysTrue = z.object({
  ...BaseSchema.shape,
  multipleDays: z.literal(true),
  endDate: z
    .custom<Dayjs>((val) => val instanceof dayjs, "Invalid date")
    .refine((arg) => arg.isAfter(dayjs()), "Please select a valid end date."),
});

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
