declare namespace Actions {
  export interface ReducerAction<T = unknown> extends Record<string, any> {
    type: T;
  }

  export interface ReducerActionCreator<T = unknown> {
    (...args: any[]): T;
  }

  export type ReducerActionCreatorsMap<C = unknown> = {
    [K in keyof C]: ReducerActionCreator<C[K]>;
  };
}
