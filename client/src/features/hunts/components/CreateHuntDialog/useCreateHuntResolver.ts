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

const CreateHuntSchemaUnion = z.discriminatedUnion("multipleDays", [
  schemaMultipleDaysFalse,
  schemaMultipleDaysTrue,
]);

export type CreateHuntFormSchema = z.infer<typeof CreateHuntSchemaUnion>;

export const useCreateHuntResolver = () => {
  const resolver = zodResolver(
    CreateHuntSchemaUnion.refine(
      // data isn't destructured becasue of "endDate" possibly not existing
      (data) => {
        if (data.multipleDays) {
          return data.endDate.isAfter(data.startDate);
        }
        return true;
      },
      {
        path: ["endDate"],
        message: "Please select a valid date.",
      }
    )
  );

  return useMemo((): [typeof resolver] => [resolver], [resolver]);
};
