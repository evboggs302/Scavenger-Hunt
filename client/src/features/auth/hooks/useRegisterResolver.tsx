import { z } from "zod";
import { useMemo } from "react";
import { useApolloClient } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { UsernameExistsDocument } from "@generated/graphql";

const schema = z.object({
  firstName: z
    .string({ message: "This field is required." })
    .trim()
    .min(3, { message: "This field requires at least 3 characters." }),
  lastName: z
    .string({ message: "This field is required." })
    .trim()
    .min(3, { message: "This field requires at least 3 characters." }),
  password: z
    .string({ message: "This field is required." })
    .trim()
    .min(12, { message: "This field requires at least 12 characters." }),
  username: z
    .string({ message: "This field is required." })
    .trim()
    .min(3, { message: "This field requires at least 3 characters." }),
});

export type RegisterSchema = z.infer<typeof schema>;

export const useRegisterResolver = () => {
  const client = useApolloClient();

  const resolver = zodResolver(
    schema.refine(
      async ({ username }) => {
        const { data } = await client.query({
          query: UsernameExistsDocument,
          variables: {
            username,
          },
          fetchPolicy: "network-only",
        });

        return !data.userNameExists;
      },
      {
        path: ["username"],
        message: "This username is already in use.",
      },
    ),
  );

  return useMemo((): [typeof resolver] => [resolver], [resolver]);
};
