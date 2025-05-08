import { fetchAuctions } from "/src/js/data/fetchAuctions.js";

export async function filteredAuctionsByCategory(category) {
    const auctions = await fetchAuctions();
    const filteredAuctions = auctions.filter((auction) =>
      auction.tags.some((tag) => tag.toLowerCase() === category.toLowerCase()),
    );
    
    return filteredAuctions;
}