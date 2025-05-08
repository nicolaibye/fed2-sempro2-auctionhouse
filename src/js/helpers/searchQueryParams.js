export function searchQueryParams() {
  const searchInput = document.getElementById("home-search");

  searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      const query = searchInput.value.trim();
      if (query) {
        window.location.href = `/auctions/?q=${query}`;
      }
    }
  });
}
