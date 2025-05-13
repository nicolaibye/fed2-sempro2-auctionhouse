import { fetchAuctions } from "/src/js/data/fetchAuctions.js";
import { liveBidsCount } from "/src/js/helpers/liveBidsCount.js";
import { fetchAuctionById } from "/src/js/data/fetchAuctionById.js";
import { formatedTitle } from "/src/js/helpers/formatedTitle.js";

export async function populateRecommendedAuctions() {
  try {
    const allAuctions = await fetchAuctions();
    const recommendedAuctions = allAuctions
      .filter((auction) => {
        const currentDate = new Date();
        const auctionEndDate = new Date(auction.endsAt);
        return auctionEndDate > currentDate;
      })
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);

    const detailedAuctions = await Promise.all(
      recommendedAuctions.map((auction) => fetchAuctionById(auction.id)),
    );

    const limitedAuctionsContainer =
      document.getElementById("related-auctions");
    limitedAuctionsContainer.innerHTML = "";

    detailedAuctions.forEach((auction) => {
      const auctionCard = document.createElement("li");

      const auctionLink = document.createElement("a");
      auctionLink.href = `/auctions/item/?id=${auction.id}`;
      auctionLink.classList.add(
        "aspect-square",
        "w-56",
        "flex",
        "flex-col",
        "bg-purpleBrand",
        "rounded-[20px]",
        "relative",
        "max-w-[390px]",
        "w-full",
        "h-[220px]",
        "overflow-hidden",
      );

      const auctionImage = document.createElement("img");
      auctionImage.classList.add(
        "w-full",
        "h-2/3",
        "object-cover",
        "rounded-[20px]",
        "outline-2",
        "outline",
        "-outline-offset-2",
        "outline-purpleBrand",
      );
      auctionImage.src = auction.media[0]?.url;
      auctionImage.alt = auction.media[0]?.alt;

      const auctionInfo = document.createElement("div");
      auctionInfo.classList.add(
        "flex",
        "gap-2",
        "p-2",
        "px-5",
        "justify-between",
        "items-center",
      );

      const auctionDetails = document.createElement("div");

      const auctionTitle = document.createElement("p");
      auctionTitle.classList.add("text-white");
      auctionTitle.textContent = formatedTitle(auction.title);

      const auctionBidContainer = document.createElement("div");
      auctionBidContainer.classList.add("flex", "items-center", "gap-1");

      const auctionBidsIcon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg",
      );
      auctionBidsIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      auctionBidsIcon.setAttribute("width", "20");
      auctionBidsIcon.setAttribute("height", "20");
      auctionBidsIcon.setAttribute("viewBox", "0 0 16 16");
      auctionBidsIcon.setAttribute("fill", "none");
      const auctionBidsCircle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle",
      );
      auctionBidsCircle.setAttribute("cx", "7.75113");
      auctionBidsCircle.setAttribute("cy", "7.90002");
      auctionBidsCircle.setAttribute("r", "7.40582");
      auctionBidsCircle.setAttribute("fill", "white");
      const auctionBidsPath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      auctionBidsPath.setAttribute(
        "d",
        "M7.82936 12.5873C5.00471 12.5873 2.9772 10.6291 2.9772 7.89108C2.9772 5.15308 5.00471 3.21222 7.82936 3.21222C9.47562 3.21222 10.8446 3.88806 11.5724 5.17041L10.3074 5.98488C9.71823 5.08376 8.81712 4.66787 7.81203 4.66787C6.0098 4.66787 4.65813 5.93289 4.65813 7.89108C4.65813 9.88393 6.0098 11.1316 7.81203 11.1316C8.81712 11.1316 9.71823 10.7157 10.3074 9.81462L11.5724 10.6118C10.8446 11.8941 9.47562 12.5873 7.82936 12.5873Z",
      );
      auctionBidsPath.setAttribute("fill", "#632677");
      const auctionBidsRect = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect",
      );
      auctionBidsRect.setAttribute("x", "7.70003");
      auctionBidsRect.setAttribute("y", "6.70047");
      auctionBidsRect.setAttribute("width", "1.69649");
      auctionBidsRect.setAttribute("height", "1.69649");
      auctionBidsRect.setAttribute("transform", "rotate(45 7.70003 6.70047)");
      auctionBidsRect.setAttribute("fill", "#632677");

      auctionBidsIcon.append(auctionBidsCircle);
      auctionBidsIcon.append(auctionBidsPath);
      auctionBidsIcon.append(auctionBidsRect);

      const auctionBidAmount = document.createElement("p");
      auctionBidAmount.classList.add("text-white");
      liveBidsCount(auction.bids, auctionBidAmount);

      const auctionArrow = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg",
      );
      auctionArrow.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      auctionArrow.setAttribute("width", "18");
      auctionArrow.setAttribute("height", "19");
      auctionArrow.setAttribute("viewBox", "0 0 18 19");
      auctionArrow.setAttribute("fill", "none");
      const auctionArrowPath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      auctionArrowPath.setAttribute("d", "M8.47357 17L15.9736 9.5L8.47357 2");
      auctionArrowPath.setAttribute("stroke", "#FFFFFF");
      auctionArrowPath.setAttribute("stroke-width", "3");
      auctionArrowPath.setAttribute("stroke-linecap", "round");
      auctionArrowPath.setAttribute("stroke-linejoin", "round");
      const auctionArrowPath2 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      auctionArrowPath2.setAttribute("d", "M2.00004 9.5L13.2499 9.5");
      auctionArrowPath2.setAttribute("stroke", "#FFFFFF");
      auctionArrowPath2.setAttribute("stroke-width", "3");
      auctionArrowPath2.setAttribute("stroke-linecap", "round");
      auctionArrowPath2.setAttribute("stroke-linejoin", "round");
      auctionArrowPath2.setAttribute("stroke-dasharray", "3 5");
      auctionArrow.append(auctionArrowPath);
      auctionArrow.append(auctionArrowPath2);

      auctionBidContainer.append(auctionBidAmount, auctionBidsIcon);
      auctionDetails.append(auctionTitle, auctionBidContainer);
      auctionInfo.append(auctionDetails, auctionArrow);
      auctionLink.append(auctionImage, auctionInfo);
      auctionCard.append(auctionLink);
      limitedAuctionsContainer.append(auctionCard);
    });
  } catch (error) {
    console.error(
      "There was a problem with the fetch operation:",
      error.message,
    );
    displayMessage("#message", "error", error.message);
    return;
  }
}
