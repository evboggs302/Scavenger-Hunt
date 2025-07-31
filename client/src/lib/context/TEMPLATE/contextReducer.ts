import type { ContextActions } from "./contextActions";

export type TemplateState = {
  _id: string;
  userName: string;
  firstName: string;
  lastName: string;
  attributes?: Record<string, unknown>;
};

export const contextReducer = (
  state: TemplateState,
  action: ContextActions
): TemplateState => {
  switch (action.type) {
    case "SET_NAME":
      return {
        ...state,
        firstName: action.payload.name,
      };
    case "SET_ATTRIBUTES":
      return {
        ...state,
        attributes: action.payload.attributes,
      };
    default:
      return state;
  }
};
