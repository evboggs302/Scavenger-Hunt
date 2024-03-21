import { createErrLog } from "./eventLogHelpers";

export const NotFoundError = async (message: string, location?: string) => {
  const type = "NotFoundError";
  await createErrLog({
    err: null,
    location: location || type,
    message,
  });
  return {
    __typename: `${type}` as const,
    _error_type_: type,
    message,
  };
};

export const AuthError = async (message: string, location?: string) => {
  const type = "AuthorizationError";
  await createErrLog({
    err: null,
    location: location || type,
    message,
  });
  return {
    __typename: `${type}` as const,
    _error_type_: type,
    message,
  };
};

export const InvalidInputError = async (message: string, location?: string) => {
  const type = "InvalidInputError";
  await createErrLog({
    err: null,
    location: location || type,
    message,
  });
  return {
    __typename: `${type}` as const,
    _error_type_: type,
    message,
  };
};

export const UnknownError = async (message: string, location?: string) => {
  const type = "UnknownError";
  await createErrLog({
    err: null,
    location: location || type,
    message,
  });
  return {
    __typename: `${type}` as const,
    _error_type_: type,
    message,
  };
};
