import { filteredAuctionsByCategory } from "/src/js/data/filteredAuctionsByCategory.js";
import { createAuctions } from "/src/js/present/auctions/createAuctions.js";
import { fetchAuctions } from "/src/js/data/fetchAuctions.js";

export function categoryHandler(form) {
  const categoryFilterButton = document.getElementById(
    "category-filter-button",
  );
  const categoryFilterContainer = document.getElementById(
    "category-filter-container",
  );

  const tagInputs = document.querySelectorAll(
    "#category-filter-container input[type='radio']",
  );
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");
  if (category) {
    tagInputs.forEach((input) => {
      if (input.value.toLowerCase() === category) {
        input.checked = true;
        categoryFilterButton.classList.add("bg-purpleBrand");
        categoryFilterButton.classList.add("text-white");
        categoryFilterContainer.classList.remove("hidden");
        categoryFilterContainer.classList.add("flex");
      }
    });
  }

  tagInputs.forEach((input) => {
    input.addEventListener("change", async () => {
      const newCategory = input.value.toLowerCase();
      const baseUrl = window.location.origin + window.location.pathname;
      const newParams = new URLSearchParams({
        category: newCategory,
      });
      const newUrl = `${baseUrl}?${newParams.toString()}`;
      history.replaceState(null, "", newUrl);
      try {
        const filteredAuctions = await filteredAuctionsByCategory(newCategory);
        createAuctions("#auctionsAll", filteredAuctions);
      } catch (error) {
        console.error(
          "There was a problem with the fetch operation:",
          error.message,
        );
        displayMessage("#message", "error", error.message);
      }
    });
  });

  categoryFilterButton.addEventListener("click", async () => {
    const isVisible = categoryFilterContainer.classList.contains("hidden");
    categoryFilterContainer.classList.toggle("hidden");
    categoryFilterContainer.classList.toggle("flex");
    categoryFilterButton.classList.toggle("bg-purpleBrand");
    categoryFilterButton.classList.toggle("text-white");

    if (!isVisible) {
      tagInputs.forEach((input) => {
        if (input.checked) {
          input.checked = false;
        }
      });
      const url = window.location.origin + window.location.pathname;
      history.replaceState(null, "", url);
      try {
        const allAuctions = await fetchAuctions();
        createAuctions("#auctionsAll", allAuctions);
      } catch (error) {
        console.error(
          "There was a problem with the fetch operation:",
          error.message,
        );
        displayMessage("#message", "error", error.message);
      }
    }
  });
}
