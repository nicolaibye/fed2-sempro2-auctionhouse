/**
 * Add to session storage
 * @param {string} key - The key to add to session storage
 * @param {any} value - The value to add to session storage
 * @example
 * ```js
 * // Add to session storage
 * const key = "token";
 * const value = "123456789";
 * addToSessionStorage(key, value);
 * // Expected output:
 * // token: "123456789"
 * ```
 */

export function addToSessionStorage(key, value) {
  if (typeof value === "object") {
    sessionStorage.setItem(key, JSON.stringify(value));
  } else {
    sessionStorage.setItem(key, value);
  }
}
