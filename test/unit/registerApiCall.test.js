import { expect, describe, it, vi, beforeEach } from "vitest";
import { registerApiCall } from "/src/js/data/profile/registerApiCall.js";

describe("registerApiCall", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it("returns the register data when the API call is successful", async () => {
    const successResponse = {
      name: "John Doe",
      email: "qjK7v@example.com",
    };

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(successResponse),
    });

    const result = await registerApiCall({
      name: "John Doe",
      email: "qjK7v@example.com",
      password: "password123",
    });

    expect(result).toEqual(successResponse);
  });

  it("throws an error when the API call fails", async () => {
    fetch.mockResolvedValue({
      ok: false,
      json: () =>
        Promise.resolve({ errors: [{ message: "Registration failed" }] }),
    });

    await expect(
      registerApiCall({
        name: "John Doe",
        email: "qjK7v@example.com",
        password: "password123",
      }),
    ).rejects.toThrow("Registration failed");
  });
});
