import { toStringEnum } from "@lib/utils/toStringEnum";
import type { TemplateState } from "./contextReducer";

export const CONTEXT_ACTION_TYPES = toStringEnum([
  "SET_NAME",
  "SET_ATTRIBUTES",
]);

export const contextActions = {
  setName: (name: string) => ({
    type: CONTEXT_ACTION_TYPES.SET_NAME,
    payload: { name },
  }),
  setAttributes: (attributes: TemplateState["attributes"] = {}) => ({
    type: CONTEXT_ACTION_TYPES.SET_ATTRIBUTES,
    payload: {
      attributes,
    },
  }),
};

export type ContextActions = ReturnType<ValueOf<typeof contextActions>>;
