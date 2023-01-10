import { expect } from "vitest";
import { unique, getLast } from "./Array";

describe("unique", () => {
  it("should remove duplicates from the array", () => {
    expect(unique([1, 2, 3, 3, 4, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    expect(unique(["a", "b", "c", "c", "d"])).toEqual(["a", "b", "c", "d"]);
  });

  it("should return an empty array for an empty input array", () => {
    expect(unique([])).toEqual([]);
  });

});

describe("getLast", () => {
  it("should return the last element of array", () => {
    expect(getLast([1, 2, 3, 4, 5])).toEqual(5);
    expect(getLast(["a", "b", "c", "d"])).toEqual("d");
  });

  it("should return undefined for an empty array", () => {
    expect(getLast([])).toBeUndefined();
  });

});
