import { expect, describe, it } from "vitest";
import { getPercentageProportion } from "./Number";

describe("getPercentageProportion", () => {
  it("should return the correct percentage proportion", () => {
    expect(getPercentageProportion(50, 100)).toBe(50);
    expect(getPercentageProportion(25, 100)).toBe(25);
    expect(getPercentageProportion(75, 100)).toBe(75);
  });

  it("should handle division by zero", () => {
    expect(getPercentageProportion(50, 0)).toEqual(0);
  });

  it("should handle negative numbers", () => {
    expect(getPercentageProportion(-50, 100)).toEqual(0);
    expect(getPercentageProportion(50, -100)).toEqual(0);
  });
});
