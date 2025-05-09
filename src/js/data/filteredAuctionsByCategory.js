import { fetchAuctionsByCategory } from "/src/js/data/fetchAuctionsByCategory.js";

export async function filteredAuctionsByCategory(category) {
  const auctions = await fetchAuctionsByCategory(category);
  return auctions;
}
