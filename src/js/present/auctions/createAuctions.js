import { createAuctionCard } from "/src/js/present/auctions/createAuctionCard.js";

export function createAuctions(container, data) {
  let auctionsContainer = container;
  if (typeof container === "string") {
    auctionsContainer = document.querySelector(container);
  }

  if (data.length === 0) {
    const message = document.querySelector("#message");
    message.classList.add("message");
    message.classList.add("warning");
    message.textContent = "There are currently no auctions available.";
    auctionsContainer.innerHTML = "";
    setTimeout(() => {
      message.innerHTML = "";
      message.classList.remove("warning");
      message.classList.remove("message");
    }, 3000);
    return;
  } else {
    message.innerHTML = "";
    message.classList.remove("warning");
    message.classList.remove("message");
    auctionsContainer.innerHTML = "";

    data.forEach((auction) => {
      const auctionCard = createAuctionCard(auction);
      auctionsContainer.append(auctionCard);
    });
  }
}
