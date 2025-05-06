export function liveBidsCount(bids, element) {
  function updateBidsCount() {
    const bidTest = Array.isArray(bids) ? bids : [];
    const latestBid = bidTest[bidTest.length - 1];
    element.textContent = latestBid?.amount || 0;
  }
  updateBidsCount();
  setInterval(updateBidsCount, 60000);
}
