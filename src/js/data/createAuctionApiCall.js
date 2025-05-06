import { getFromSessionStorage } from "/src/js/helpers/getFromSessionStorage.js";
import { listingUrl, noroffKey } from "/src/js/const/api.js";

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
