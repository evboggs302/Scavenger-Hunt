import { formatDateString } from "./formatDateString";

describe("formatDateString", () => {
  it("should produce the correctly formatted date string", () => {
    expectTypeOf(formatDateString).toBeFunction();

    // @ts-expect-error -- arg should not be a date object
    assertType(formatDateString(new Date()));

    const input1 = new Date("05 October 2011 13:00").toISOString();
    expect(formatDateString(input1)).toEqual(
      "Wednesday, October 5, 2011 1:00:00 PM"
    );

    const input2 = new Date("23 March 2018 14:00").toISOString();
    expect(formatDateString(input2)).toEqual(
      "Friday, March 23, 2018 2:00:00 PM"
    );

    const input3 = new Date("08 August 2021 15:00").toISOString();
    expect(formatDateString(input3)).toEqual(
      "Sunday, August 8, 2021 3:00:00 PM"
    );

    const input4 = new Date("25 Decemeber 2012 16:00").toISOString();
    expect(formatDateString(input4)).toEqual(
      "Tuesday, December 25, 2012 4:00:00 PM"
    );
  });
});
