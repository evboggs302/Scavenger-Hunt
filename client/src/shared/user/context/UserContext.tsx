import { createContext } from "react";
import { BaseUserPayload } from "../../../generated/graphql";

export interface UserContextValue extends Partial<BaseUserPayload> {
  error?: unknown;
  loading: boolean;
}

export const UserContext = createContext<UserContextValue | undefined>(
  undefined
);
