import { fetchAuctionById } from "/src/js/data/fetchAuctionById.js";
import { populateAuction } from "/src/js/present/profile/populateAuction.js";
import { displayMessage } from "/src/js/present/common/displayMessage.js";
import { fetchProfile } from "/src/js/data/profile/fetchProfile.js";
import { populateRecommendedAuctions } from "/src/js/present/profile/populateRecommendedAuctions.js";
import { placeBid } from "/src/js/logic/auctions/placeBid.js";

export async function auctionByIdHandler() {
  const queryParams = new URLSearchParams(window.location.search);
  const auctionId = queryParams.get("id");
  try {
    const auction = await fetchAuctionById(auctionId);
    const seller = await fetchProfile(auction.seller.name);
    populateAuction(auction, seller);
    populateRecommendedAuctions();
    placeBid(auctionId);
  } catch (error) {
    console.error(
      "There was a problem with the fetch operation:",
      error.message,
    );
    displayMessage("#message", "error", error.message);
    return;
  }
}
