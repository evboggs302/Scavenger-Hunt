export declare const initialState: {
    user: {
        user: null;
        following: null;
        otherPerson: never[];
    };
    hunt: {};
    teams: never[];
    clues: never[];
};
declare const store: import("@reduxjs/toolkit/dist/configureStore").ToolkitStore<{
    user: {
        user: null;
        following: null;
        otherPerson: never[];
    };
    hunt: {};
    teams: never[];
    clues: never[];
}, import("redux").AnyAction, [import("@reduxjs/toolkit").ThunkMiddleware<{
    user: {
        user: null;
        following: null;
        otherPerson: never[];
    };
    hunt: {};
    teams: never[];
    clues: never[];
}, import("redux").AnyAction>]>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
