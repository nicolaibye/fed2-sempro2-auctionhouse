export function liveBidsCount(bids, element) {
    function updateBidsCount() {
        const latestBid = bids[bids.length - 1];
        element.textContent = latestBid?.amount || 0;
    }
    updateBidsCount();
    setInterval(updateBidsCount, 60000);
}