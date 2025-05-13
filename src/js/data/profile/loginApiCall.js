import { loginUrl } from "/src/js/const/api.js";
import { addToSessionStorage } from "/src/js/helpers/addToSessionStorage.js";

/**
 *
 * @param {object} data
 * @returns {object} userData
 * @example
 * ```js
 * const data = {
 *   email: "qjK7v@example.com",
 *   password: "password123",
 * };
 * const userData = await loginApiCall(data);
 * // Expected output:
 * // returns response
 * ```
 */

export async function loginApiCall(data) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(loginUrl, options);
  const userData = await response.json();

  if (!response.ok) {
    throw new Error(data.errors?.[0]?.message || "Login failed");
  }

  const user = userData.data;
  addToSessionStorage("token", user.accessToken);
  addToSessionStorage("username", user.name);
  addToSessionStorage("avatar", user.avatar.url);
  return user;
}
