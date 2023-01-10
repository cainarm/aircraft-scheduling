import { expect, describe, it } from "vitest";
import { toLongDateString } from "./Date";

describe("toLongDateString", () => {
  it("should return the correct formatted date string", () => {
    const date = new Date(2022, 0, 1);
    expect(toLongDateString(date)).toBe("1st January 2022");

    const date2 = new Date(2022, 11, 31);
    expect(toLongDateString(date2)).toBe("31st December 2022");
  });

  it("should handle invalid date", () => {
    expect(() => toLongDateString(new Date("invalid"))).toThrow();
  });
});
