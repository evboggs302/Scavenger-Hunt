import type { Dispatch } from "react";

const bindAction = <A extends Actions.ReducerAction>(
  creator: Actions.ReducerActionCreator<A>,
  dispatch: Dispatch<ReturnType<Actions.ReducerActionCreator<A>>>
) =>
  function (this: unknown, ...args: unknown[]) {
    return dispatch(creator.apply(this, args));
  };

export const bindActionCreators = <
  T,
  M extends Actions.ReducerActionCreatorsMap<T>,
>(
  creators: M,
  dispatch: Dispatch<ReturnType<ValueOf<Actions.ReducerActionCreatorsMap>>>
): M => {
  const boundCreators: Actions.ReducerActionCreatorsMap = {};

  for (const key in creators) {
    const actionCreator = creators[key];
    if (typeof actionCreator === "function") {
      // @ts-ignore
      boundCreators[key] = bindAction(creators, dispatch);
    }
  }

  return boundCreators as M;
};
