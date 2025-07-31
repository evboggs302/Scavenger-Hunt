import { createContext, useMemo, useReducer } from "react";
import { contextReducer, type TemplateState } from "./contextReducer";
import { contextActions } from "./contextActions";
import { bindActionCreators } from "@lib/utils/bindActionCreators";

export interface TemplateContextValue {
  state: TemplateState;
  actions: ReturnType<typeof useContextReducer>["actions"];
}

export const TemplateContext = createContext<TemplateContextValue | undefined>(
  undefined
);

export const useContextReducer = (
  initialState: Partial<TemplateState> = {}
) => {
  const defaultState: TemplateState = {
    _id: "",
    userName: "",
    firstName: "",
    lastName: "",
    ...initialState,
  };

  const [state, dispatch] = useReducer(contextReducer, defaultState);

  const actions = useMemo(
    () => bindActionCreators(contextActions, dispatch),
    [dispatch]
  );

  return useMemo(() => ({ state, actions }), [state, actions]);
};

export const useCreateTemplateContextValue = (
  defaultState: Partial<TemplateState>
): TemplateContextValue => {
  const reducer = useContextReducer(defaultState);

  return useMemo(() => ({ ...reducer }), [reducer]);
};
