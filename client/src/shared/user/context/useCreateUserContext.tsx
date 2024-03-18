import { useMemo } from "react";

export interface UseUserContextValueArgs {
  _id: string;
  userName: string;
  firstName: string;
  lastName: string;
  token?: string;
}

export const useCreateUserContextValue = ({
  _id,
  userName,
  firstName,
  lastName,
  token,
}: UseUserContextValueArgs) => {
  return useMemo(
    () => ({
      _id,
      userName,
      firstName,
      lastName,
      token,
    }),
    [_id, userName, firstName, lastName, token]
  );
};

export type UserContextValue = ReturnType<typeof useCreateUserContextValue>;
