import { z } from "zod";
import { useMemo } from "react";
import { useApolloClient } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EmailExistsDocument,
  UsernameExistsDocument,
} from "@generated/graphql";

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
    .min(8, { message: "This field requires at least 8 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export type RegisterSchema = z.infer<typeof schema>;

export const useRegisterResolver = () => {
  const client = useApolloClient();

  const resolver = zodResolver(
    schema.superRefine(async ({ username, email }, ctx) => {
      const { data } = await client.query({
        query: UsernameExistsDocument,
        variables: {
          username,
        },
        fetchPolicy: "network-only",
      });

      if (data.userNameExists) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["username"],
          message: "This username is already in use.",
        });

        return z.NEVER;
      }

      const { data: emailRes } = await client.query({
        query: EmailExistsDocument,
        variables: {
          email,
        },
        fetchPolicy: "network-only",
      });

      if (!emailRes.emailExists) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["email"],
          message: "This email is already associated to a user.",
        });

        return z.NEVER;
      }
    })
  );

  return useMemo((): [typeof resolver] => [resolver], [resolver]);
};
