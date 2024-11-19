import { z } from "zod";
import { useMemo } from "react";
import { useApolloClient } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { UsernameExistsDocument } from "@generated/graphql";

export const useRegisterResolver = () => {
  const client = useApolloClient();

  const schema = z.object({
    firstName: z
      .string({ required_error: "This field is required." })
      .trim()
      .min(3, { message: "This field requires at least 3 characters." }),
    lastName: z
      .string({ required_error: "This field is required." })
      .trim()
      .min(3, { message: "This field requires at least 3 characters." }),
    password: z
      .string({ required_error: "This field is required." })
      .trim()
      .min(12, { message: "This field requires at least 12 characters." }),
    username: z
      .string({ required_error: "This field is required." })
      .trim()
      .min(3, { message: "This field requires at least 3 characters." })
      .refine(async (val) => {
        const { data } = await client.query({
          query: UsernameExistsDocument,
          variables: {
            username: val,
          },
          fetchPolicy: "network-only",
        });

        return !data.userNameExists;
      }, "This username is already in use."),
  });

  const resolver = zodResolver(schema);

  return useMemo(
    (): [typeof resolver] => [resolver],
    [resolver, client, schema]
  );
};
