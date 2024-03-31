import { createContext } from "react";
import { Hunt } from "../../../generated/graphql";

export interface HuntContextValue extends Partial<Hunt> {
  error?: unknown;
  loading: boolean;
}

export const HuntContext = createContext<HuntContextValue | undefined>(
  undefined
);
