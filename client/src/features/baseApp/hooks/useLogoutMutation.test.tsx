import { act, renderHook } from "@testing-library/react";
import { useLogoutMutation } from "./useLogoutMutation";
import { renderWrapper } from "@test/renderWrapper";

describe("useLogoutMutation", () => {
  it("should initialize with correct default values", () => {
    const { result } = renderHook(() => useLogoutMutation(), {
      wrapper: renderWrapper,
    });
    const [, mutationResult] = result.current;

    expect(mutationResult.called).toBe(false);
    expect(mutationResult.data).toBeUndefined();
  });

  it("should call the loginUser mutation with correct variables", async () => {
    const { result } = renderHook(() => useLogoutMutation(), {
      wrapper: renderWrapper,
    });
    const [handleLogout, mutationResult] = result.current;

    await act(async () => await handleLogout());

    console.log(mutationResult);

    expect(mutationResult.called).toBe(true);
    expect(mutationResult.data?.logout).toEqual(true);
  });
});
