import { createAuctionCard } from "/src/js/present/auctions/createAuctionCard.js";
import { displayMessage } from "/src/js/present/common/displayMessage.js";

export function createAuctions(container, data) {
  let auctionsContainer = container;
  if (typeof container === "string") {
    auctionsContainer = document.querySelector(container);
  }

  if (!data || data === null || data === undefined || data.length === 0) {
    displayMessage(
      auctionsContainer,
      "warning",
      "There are currently no auctions available.",
    );
    return;
  }

  auctionsContainer.innerHTML = "";

  data.forEach((auction) => {
    const auctionCard = createAuctionCard(auction);
    auctionsContainer.append(auctionCard);
  });
}
