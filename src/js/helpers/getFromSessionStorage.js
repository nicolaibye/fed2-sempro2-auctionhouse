/**
 * Get from session storage
 * @param {string} key - The key to get from session storage
 * @returns {any} The value from session storage
 * @example
 * ```js
 * // Get from session storage
 * const key = "token";
 * const value = getFromSessionStorage(key);
 * // Expected output:
 * // token: "value set in session storage"
 * ```
 */

export function getFromSessionStorage(key) {
  const value = sessionStorage.getItem(key);
  if (value) {
    return value;
  }
  return null;
}
