import { listingUrl } from "/src/js/const/api.js";
import { displayMessage } from "/src/js/present/common/displayMessage.js";

export async function fetchAuctionsByCategory(category) {
  try {
    const url = `${listingUrl}?_tag=${category}&_active=true`;
    const response = await fetch(url, { method: "GET" });
    const auctions = await response.json();
    if (!response.ok) {
      throw new Error(
        auctions.errors?.[0]?.message || "Failed to fetch auctions",
      );
    }
    return auctions.data;
  } catch (error) {
    console.error(
      "There was a problem with the fetch operation:",
      error.message,
    );
    displayMessage("#message", "error", error.message);
    return;
  }
}
