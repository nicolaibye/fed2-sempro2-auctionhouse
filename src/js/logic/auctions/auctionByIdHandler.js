import { fetchAuctionById } from "/src/js/data/fetchAuctionById.js";
import { populateAuction } from "/src/js/present/auctions/populateAuction.js";
import { displayMessage } from "/src/js/present/common/displayMessage.js";
import { fetchProfile } from "/src/js/data/profile/fetchProfile.js";
import { populateRecommendedAuctions } from "/src/js/present/profile/populateRecommendedAuctions.js";
import { getFromSessionStorage } from "/src/js/helpers/getFromSessionStorage.js";
import { placeBid } from "/src/js/logic/auctions/placeBid.js";
import { previousBidsOverlay } from "/src/js/present/auctions/previousBidsOverlay.js";

export async function auctionByIdHandler() {
  const queryParams = new URLSearchParams(window.location.search);
  const auctionId = queryParams.get("id");
  const token = getFromSessionStorage("token");
  try {
    const auction = await fetchAuctionById(auctionId);

    populateAuction(auction);
    populateRecommendedAuctions();
    placeBid(auctionId);
    const previousBidsButton = document.getElementById("auction-bids");
    previousBidsButton.addEventListener("click", () => {
      const body = document.querySelector("body");
      body.classList.add("overflow-hidden");
      previousBidsOverlay(auction.bids);
    });
  } catch (error) {
    console.error(
      "There was a problem with the fetch operation:",
      error.message,
    );
    displayMessage("#message", "error", error.message);
    return;
  }
}
