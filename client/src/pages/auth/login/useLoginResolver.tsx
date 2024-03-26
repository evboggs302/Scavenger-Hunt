import { z } from "zod";
import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

export const useLoginResolver = () => {
  const schema = z.object({
    password: z.string({ required_error: "This field is required." }).trim(),
    username: z.string({ required_error: "This field is required." }).trim(),
  });

  const resolver = zodResolver(schema);

  return useMemo((): [typeof resolver] => [resolver], [resolver, schema]);
};
