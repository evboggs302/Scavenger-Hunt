export const createDeleteResponse = (exp: boolean) => ({
  __typename: "Delete" as const,
  success: exp,
});
