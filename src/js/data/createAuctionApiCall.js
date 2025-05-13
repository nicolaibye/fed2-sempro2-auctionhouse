import { getFromSessionStorage } from "/src/js/helpers/getFromSessionStorage.js";
import { listingUrl, noroffKey } from "/src/js/const/api.js";

/**
 *
 * @param {object} data
 * @returns {object} responseData
 * @example
 * ```js
 * const data = {
 *   name: "Example Item",
 *   description: "This is a description",
 *   endsAt: "2023-01-01T00:00:00.000Z",
 *   media: [
 *     {
 *       url: "https://example.com/image.jpg",
 *       alt: "Example Image"
 *     }
 *   ],
 * };
 * const responseData = await createAuctionApiCall(data);
 * }
 * // Expected output:
 * // returns response
 * ```
 */

export async function createAuctionApiCall(data) {
  const token = getFromSessionStorage("token");
  if (!token) {
    throw new Error("Your not authorized to create an auction.");
  }
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": noroffKey,
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(listingUrl, options);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.errors?.[0]?.message || "Failed to create auction",
    );
  }
  const responseData = await response.json();
  return responseData;
}
