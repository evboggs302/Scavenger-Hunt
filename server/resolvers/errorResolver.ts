import { Resolvers } from "../generated/graphql";

export const errorResolver: Resolvers = {
  NotFoundError: {
    __isTypeOf: (obj) => obj._error_type_ === "NotFoundError",
    message: (obj) => obj.message,
  },
  UnknownError: {
    __isTypeOf: (obj) => obj._error_type_ === "UnknownError",
    message: (obj) => obj.message,
  },
  AuthorizationError: {
    __isTypeOf: (obj) => obj._error_type_ === "AuthError",
    message: (obj) => obj.message,
  },
  InvalidInputError: {
    __isTypeOf: (obj) => obj._error_type_ === "InvalidInputError",
    message: (obj) => obj.message,
  },
};
