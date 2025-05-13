import { liveCountdown } from "../../helpers/liveCountdown";
import { liveBidsCount } from "../../helpers/liveBidsCount";
import { formatedTitle } from "../../helpers/formatedTitle";
import { getFromSessionStorage } from "/src/js/helpers/getFromSessionStorage.js";
import { editAuctionOverlay } from "/src/js/present/auctions/editAuctionOverlay.js";

export function createAuctionCard(auction) {
  const { id, title, media, endsAt, bids } = auction;
  const auctionCard = document.createElement("li");
  auctionCard.className =
    "flex flex-col bg-yellowBrand rounded-[20px] relative max-w-[390px] w-full h-[220px] overflow-hidden";

  const timeContainer = document.createElement("div");
  timeContainer.className =
    "flex absolute top-2 left-2 items-center gap-2 bg-purpleBrand/75 background-blur-sm px-1 rounded-full w-fit";

  const timeIcon = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg",
  );
  timeIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  timeIcon.setAttribute("width", "14");
  timeIcon.setAttribute("height", "14");
  timeIcon.setAttribute("viewBox", "0 0 14 14");
  timeIcon.setAttribute("fill", "none");
  const timePath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path",
  );
  timePath.setAttribute("fill-rule", "evenodd");
  timePath.setAttribute("clip-rule", "evenodd");
  timePath.setAttribute(
    "d",
    "M7 14C10.866 14 14 10.866 14 7C14 3.13403 10.866 0 7 0C3.13401 0 0 3.13403 0 7C0 10.866 3.13401 14 7 14ZM7.00646 8.3913L11.2972 4.10052L10.5901 3.39343L7.00647 6.97711L4.82122 4.79181L4.11411 5.4989L7.00646 8.3913Z",
  );
  timePath.setAttribute("fill", "white");
  timeIcon.append(timePath);

  const timeText = document.createElement("p");
  timeText.className = "font-sans text-sm text-white";
  liveCountdown(endsAt, timeText);

  timeContainer.append(timeIcon);
  timeContainer.append(timeText);

  const auctionImage = document.createElement("img");
  auctionImage.src = media[0]?.url;
  auctionImage.className =
    "w-full h-2/3 object-cover rounded-[20px] outline-2 outline -outline-offset-2 outline-yellowBrand";
  auctionImage.alt = `${title} Image`;
  auctionImage.setAttribute("loading", "lazy");

  const auctionInfoContainer = document.createElement("div");
  auctionInfoContainer.className =
    "flex gap-2 p-2 px-5 justify-between items-center";

  const auctionInfo = document.createElement("div");

  const auctionTitle = document.createElement("p");
  auctionTitle.textContent = formatedTitle(title);

  const auctionBidsContainer = document.createElement("div");
  auctionBidsContainer.className = "flex items-center gap-1";
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
  auctionBidsCircle.setAttribute("fill", "#121400");
  const auctionBidsPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path",
  );
  auctionBidsPath.setAttribute(
    "d",
    "M7.82936 12.5873C5.00471 12.5873 2.9772 10.6291 2.9772 7.89108C2.9772 5.15308 5.00471 3.21222 7.82936 3.21222C9.47562 3.21222 10.8446 3.88806 11.5724 5.17041L10.3074 5.98488C9.71823 5.08376 8.81712 4.66787 7.81203 4.66787C6.0098 4.66787 4.65813 5.93289 4.65813 7.89108C4.65813 9.88393 6.0098 11.1316 7.81203 11.1316C8.81712 11.1316 9.71823 10.7157 10.3074 9.81462L11.5724 10.6118C10.8446 11.8941 9.47562 12.5873 7.82936 12.5873Z",
  );
  auctionBidsPath.setAttribute("fill", "#ECCA44");
  const auctionBidsRect = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect",
  );
  auctionBidsRect.setAttribute("x", "7.70003");
  auctionBidsRect.setAttribute("y", "6.70047");
  auctionBidsRect.setAttribute("width", "1.69649");
  auctionBidsRect.setAttribute("height", "1.69649");
  auctionBidsRect.setAttribute("transform", "rotate(45 7.70003 6.70047)");
  auctionBidsRect.setAttribute("fill", "#ECCA44");

  auctionBidsIcon.append(auctionBidsCircle);
  auctionBidsIcon.append(auctionBidsPath);
  auctionBidsIcon.append(auctionBidsRect);

  const auctionBidsCount = document.createElement("p");
  auctionBidsCount.className = "font-semibold text-xl";
  liveBidsCount(bids, auctionBidsCount);

  auctionBidsContainer.append(auctionBidsCount);
  auctionBidsContainer.append(auctionBidsIcon);

  auctionInfo.append(auctionTitle);
  auctionInfo.append(auctionBidsContainer);
  auctionInfoContainer.append(auctionInfo);

  const auctionButton = document.createElement("button");
  auctionButton.className = "btn";
  auctionButton.textContent = "View";
  auctionButton.onclick = () => {
    window.location.href = `/auctions/item/?id=${id}`;
  };

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const username = urlParams.get("username");
  const usernameStorage = getFromSessionStorage("username");

  if (username && username === usernameStorage) {
    auctionButton.textContent = "Edit";
    auctionButton.onclick = () => {
      const body = document.querySelector("body");
      body.classList.add("overflow-hidden");
      editAuctionOverlay(auction);
      const overlay = document.getElementById("overlay-container");
      const focusElements = overlay.querySelector("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
      if (focusElements) {
        focusElements.focus();
      }
    };
  }

  auctionInfoContainer.append(auctionButton);
  auctionCard.append(timeContainer);
  auctionCard.append(auctionImage);
  auctionCard.append(auctionInfoContainer);
  return auctionCard;
}
