export function fillSearchForm(container, auctions) {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("q");
  const searchInput = document.getElementById("search");
  if (query && searchInput) {
    searchInput.value = query;
    const inputEvent = new Event("input", { bubbles: true });
    searchInput.dispatchEvent(inputEvent);
  }
}
