import { createContext } from "react";
import { CluePayload } from "../../../generated/graphql";

export interface ClueContextValue {
  error?: unknown;
  loading: boolean;
  clues?: (CluePayload | null)[] | null;
}

export const ClueContext = createContext<ClueContextValue | undefined>(
  undefined
);
