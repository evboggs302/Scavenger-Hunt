import { z } from "zod";
import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs, { Dayjs } from "dayjs";
import utcPlugin from "dayjs/plugin/utc";

dayjs.extend(utcPlugin);

const dateRangeZod = z.instanceof(dayjs as unknown as typeof Dayjs);

export const useCreateHuntResolver = () => {
  const schema = z.object({
    name: z
      .string({ required_error: "This field is required." })
      .trim()
      .min(3, { message: "This field requires at least 3 characters." }),
    dateRange: z
      .array(dateRangeZod, {
        required_error: "Please select valid dates.",
        invalid_type_error: "Please select valid dates.",
      })
      .refine(
        (range) => range.filter((date) => date >= dayjs()).length === 2,
        "Please select valid dates."
      )
      .transform((val) => {
        return {
          start: dayjs.utc(val[0]).toISOString(),
          end: dayjs.utc(val[1]).toISOString(),
        };
      }),
    recall_msg: z
      .string()
      .trim()
      .min(
        3,
        "If providing a recall message, a minimum of 3 characters is needed."
      )
      .optional(),
  });

  const resolver = zodResolver(schema);

  return useMemo((): [typeof resolver] => [resolver], [resolver, schema]);
};
