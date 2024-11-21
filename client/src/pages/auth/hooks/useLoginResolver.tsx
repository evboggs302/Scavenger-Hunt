import { z } from "zod";
import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

export const useLoginResolver = () => {
  const schema = z.object({
    username: z
      .string({ message: "A valid username is required." })
      .trim()
      .min(8, { message: "A valid username is required." }),
    password: z
      .string({ message: "A valid password is required." })
      .trim()
      .min(8, { message: "A valid password is required." }),
  });

  const resolver = zodResolver(schema);

  return useMemo((): [typeof resolver] => [resolver], [resolver, schema]);
};
