import { expect, describe, it, beforeEach } from "vitest";
import { addToSessionStorage } from "/src/js/helpers/addToSessionStorage.js";

describe("addToSessionStorage", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("should add a key-value pair to session storage", () => {
    const key = "token";
    const value = "123456789";
    addToSessionStorage(key, value);
    expect(sessionStorage.getItem(key)).toBe(value);
  });

  it("should add an object to session storage", () => {
    const key = "user";
    const value = { name: "John", age: 30 };
    addToSessionStorage(key, value);
    expect(sessionStorage.getItem(key)).toBe(JSON.stringify(value));
  });
});
