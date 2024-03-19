import { useMemo } from "react";

export interface UseUserContextValueArgs {
  _id: string;
  userName: string;
  firstName: string;
  lastName: string;
}

export const useCreateUserContextValue = ({
  _id,
  userName,
  firstName,
  lastName,
}: UseUserContextValueArgs) => {
  return useMemo(
    () => ({
      _id,
      userName,
      firstName,
      lastName,
    }),
    [_id, userName, firstName, lastName]
  );
};

export type UserContextValue = ReturnType<typeof useCreateUserContextValue>;
