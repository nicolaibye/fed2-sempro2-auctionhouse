import { createAuctions } from "/src/js/present/auctions/createAuctions.js";
import { fetchAuctions } from "/src/js/data/fetchAuctions.js";
import { displayMessage } from "/src/js/present/common/displayMessage.js";
import { searchAuctions } from "/src/js/logic/auctions/searchAuctions.js";
import { searchQueryParams } from "/src/js/helpers/searchQueryParams.js";
import { fillSearchForm } from "/src/js/helpers/fillSearchForm.js";
import { filteredAuctionsByCategory } from "/src/js/data/filteredAuctionsByCategory.js";

export async function auctionHandler(containerId, amountToShow) {
  try {
    const container = document.getElementById(containerId);
    const auctions = await fetchAuctions();
    const sortedAuctions = auctions.sort(
      (a, b) => new Date(a.endsAt) - new Date(b.endsAt),
    );
    if (amountToShow) {
      sortedAuctions.splice(amountToShow);
      createAuctions(container, sortedAuctions);
      searchQueryParams();
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");
    if (category) {
      try {
        const filteredAuctions = await filteredAuctionsByCategory(category);
        createAuctions(container, filteredAuctions);
        searchAuctions(container, auctions);
        return;
      } catch (error) {
        console.error(
          "There was a problem with the fetch operation:",
          error.message,
        );
        displayMessage("#message", "error", error.message);
      }
    }

    createAuctions(container, auctions);
    searchAuctions(container, auctions);
    fillSearchForm(container, auctions);
  } catch (error) {
    console.error(
      "There was a problem with the fetch operation:",
      error.message,
    );
    displayMessage("#message", "error", error.message);
  }
}
