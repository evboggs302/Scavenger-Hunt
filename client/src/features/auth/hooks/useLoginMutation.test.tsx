import { act, renderHook } from "@testing-library/react";
import { useLoginMutation } from "./useLoginMutation";
import { renderWrapper } from "@test/renderWrapper";

describe("useLoginMutation", () => {
  it("should initialize with correct default values", () => {
    const { result } = renderHook(() => useLoginMutation(), {
      wrapper: renderWrapper,
    });
    const [, mutationResult] = result.current;

    expect(mutationResult.called).toBe(false);
    expect(mutationResult.data).toBeUndefined();
  });

  it("should call the loginUser mutation with correct variables", async () => {
    const { result } = renderHook(() => useLoginMutation(), {
      wrapper: renderWrapper,
    });
    const [handleLoginUser, mutationResult] = result.current;

    const loginArgs = { username: "testUser", password: "testPass" };
    await act(async () => await handleLoginUser(loginArgs));

    console.log(mutationResult.data?.login);

    expect(mutationResult.data?.login).toEqual({
      __typename: "AuthPayload" as const,
      _id: expect.any(String),
      token: expect.any(String),
    });
  });
});
