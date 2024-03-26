import { toStringEnum } from "./toStringEnum";

describe("toStringEnum", () => {
  it("should produce an enum from input string[]", () => {
    expectTypeOf(toStringEnum).toBeFunction();
    // @ts-expect-error -- input array should contain strings
    assertType(toStringEnum([1, 2, 3]));

    const input = ["this", "is", "a", "test"];
    const outputEnum = toStringEnum(input);

    expect(outputEnum.this).toBe("this");
    expect(outputEnum.is).toBe("is");
    expect(outputEnum.a).toBe("a");
    expect(outputEnum.test).toBe("test");
  });
});
