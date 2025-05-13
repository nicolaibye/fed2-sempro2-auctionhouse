import { expect, describe, it, beforeEach } from "vitest";
import { getFromSessionStorage } from "/src/js/helpers/getFromSessionStorage.js";

describe("getFromSessionStorage", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("should get a value from session storage", () => {
    const key = "token";
    const value = "123456789";
    sessionStorage.setItem(key, value);
    expect(getFromSessionStorage(key)).toBe(value);
  });

  it("should return null if no token is found", () => {
    const key = "token";
    expect(getFromSessionStorage(key)).toBe(null);
  });
});
