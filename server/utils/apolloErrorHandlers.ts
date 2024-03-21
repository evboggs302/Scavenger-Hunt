import { createErrLog } from "./eventLogHelpers";

export const NotFoundError = async (message: string, location?: string) => {
  await createErrLog({
    err: null,
    location: location || "NotFoundError",
    message,
  });
  return {
    __typename: "NotFoundError" as const,
    message,
  };
};

export const AuthError = async (message: string, location?: string) => {
  await createErrLog({
    err: null,
    location: location || "AuthorizationError" ,
    message,
  });
  return {
    __typename: "AuthorizationError" as const,
    message,
  };
};

export const InvalidInputError = async (message: string, location?: string) => {
  await createErrLog({
    err: null,
    location: location || "InvalidInputError",
    message,
  });
  return {
    __typename: "InvalidInputError" as const,
    message,
  };
};

export const UnknownError = async (message: string, location?: string) => {
  await createErrLog({
    err: null,
    location: location || "UnknownError",
    message,
  });
  return {
    __typename: "UnknownError" as const,
    message,
  };
};
