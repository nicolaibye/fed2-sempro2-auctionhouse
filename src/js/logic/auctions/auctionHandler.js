import { createAuctions } from "/src/js/present/auctions/createAuctions.js";
import { fetchAuctions } from "/src/js/data/fetchAuctions.js";
import { displayMessage } from "/src/js/present/common/displayMessage.js";

export async function auctionHandler(containerId, amountToShow) {
    try {
        const container = document.getElementById(containerId);
        const auctions = await fetchAuctions();
        const currentAuctions = auctions.filter((auction) => {
            const currentDate = new Date();
            const auctionEndDate = new Date(auction.endsAt);
            return auctionEndDate > currentDate;
        });
        if (amountToShow) {
            currentAuctions.sort((a, b) => new Date(a.endsAt) - new Date(b.endsAt));
            currentAuctions.splice(amountToShow);
        }

        createAuctions(container, currentAuctions);
    }
    catch (error) {
        console.error("There was a problem with the fetch operation:", error.message);
        displayMessage("#message", "error", error.message);
    }
}