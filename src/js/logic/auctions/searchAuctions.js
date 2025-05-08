import { createAuctions } from "/src/js/present/auctions/createAuctions.js";

export function searchAuctions(container, auctions) {
  const searchInput = document.getElementById("search");
  if (searchInput) {
    searchInput.addEventListener("input", handleFilter);
  }

  function handleFilter(event) {
    const searchValue = event.target.value.trim().toLowerCase();
    const filteredAuctions = auctions.filter((auction) => {
      if (
        auction.title.toLowerCase().startsWith(searchValue) ||
        auction.title.toLowerCase().includes(searchValue)
      ) {
        return true;
      }
    });
    createAuctions(container, filteredAuctions);
  }
}
