import { registerUrl } from "/src/js/const/api.js";

/**
 *
 * @param {object} data
 * @returns {object} registerData
 * @example
 * ```js
 * const data = {
 *   name: "John Doe",
 *   email: "qjK7v@example.com",
 *   password: "password123",
 * };
 * const registerData = await registerApiCall(data);
 * // Expected output:
 * // returns response
 * ```
 */

export async function registerApiCall(data) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(registerUrl, options);
  const registerData = await response.json();

  if (!response.ok) {
    throw new Error(registerData.errors?.[0]?.message || "Registration failed");
  }

  return registerData;
}
