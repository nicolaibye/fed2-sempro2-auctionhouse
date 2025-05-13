import { auctionsUrl } from "/src/js/const/api.js";
import { displayMessage } from "/src/js/present/common/displayMessage.js";

/**
 *
 * @returns {Promise} - The auctions data
 * @example
 * ```js
 * const auctions = await fetchAuctions();
 * // Expected output:
 * // returns auctions.data
 * ```
 */

export async function fetchAuctions() {
  const response = await fetch(auctionsUrl, { method: "GET" });
  const auctions = await response.json();
  if (!response.ok) {
    throw new Error(
      auctions.errors?.[0]?.message || "Failed to fetch auctions",
    );
  }
  return auctions.data;
}
