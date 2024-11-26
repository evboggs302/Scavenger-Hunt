import { z } from "zod";
import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  username: z
    .string({ message: "A valid username is required." })
    .trim()
    .min(8, { message: "A valid username is required." }),
  password: z
    .string({ message: "A valid password is required." })
    .trim()
    .min(12, { message: "A valid password is required." }),
});

export type LoginSchema = z.infer<typeof schema>;

export const useLoginResolver = () => {
  const resolver = zodResolver(schema);

  return useMemo((): [typeof resolver] => [resolver], [resolver]);
};
