import { liveCountdown } from "../../helpers/liveCountdown";
import { liveBidsCount } from "/src/js/helpers/liveBidsCount.js";

export function populateAuction(auction, seller) {
  const { title, media, tags, endsAt, bids } = auction;
  const { name, avatar, _count } = seller.data;

  const auctionPath = document.getElementById("auction-path");
  auctionPath.innerHTML = "";
  const allAuctions = document.createElement("a");
  allAuctions.href = "/auctions/";
  allAuctions.textContent = "All auctions / ";
  auctionPath.append(allAuctions);
  const currentAuction = document.createElement("span");
  currentAuction.textContent = title;
  currentAuction.classList.add("text-purpleBrand");
  auctionPath.append(currentAuction);

  const imageContainer = document.getElementById("auction-image-container");
  imageContainer.classList.remove("animate-pulse");

  const auctionImage = document.getElementById("auction-image");
  auctionImage.src = media[0]?.url;
  auctionImage.alt = media[0]?.alt || `${title} auction image`;

  const auctionTitle = document.getElementById("auction-title");
  auctionTitle.textContent = title;
  auctionTitle.classList.remove(
    "animate-pulse",
    "bg-white/50",
    "h-8",
    "rounded",
    "w-3/4",
  );

  const auctionTags = document.getElementById("auction-tags");
  if (tags.length > 0) {
    auctionTags.innerHTML = "";
    tags.forEach((tag, index) => {
      const tagLink = document.createElement("a");
      tagLink.href = `/auctions/?category=${tag.toLowerCase()}`;
      tagLink.textContent = tag;
      auctionTags.append(tagLink);
      if (index < tags.length - 1) {
        auctionTags.append(document.createTextNode(" | "));
      }
      auctionTags.classList.remove(
        "bg-white/50",
        "h-4",
        "rounded",
        "w-1/3",
        "animate-pulse",
        "mt-2",
      );
    });
  } else {
    auctionTags.textContent = "";
    auctionTags.classList.remove(
      "bg-white/50",
      "h-4",
      "rounded",
      "w-1/3",
      "animate-pulse",
      "mt-2",
    );
  }

  document.title = `Auction | ${title}`;

  const sellerProfile = document.getElementById("seller-profile");
  sellerProfile.innerHTML = "";
  const sellerImage = document.createElement("a");
  sellerImage.href = `/profile/?username=${name}`;
  sellerImage.innerHTML = `<img class="w-10 h-10 rounded-full object-cover" src="${avatar.url}" alt="${avatar.alt}">`;
  sellerProfile.append(sellerImage);
  const sellerUsername = document.createElement("a");
  sellerUsername.href = `/profile/?username=${name}`;
  sellerUsername.innerHTML = `<span class="font-semibold">${name}</span> (${_count.listings})`;
  sellerProfile.append(sellerUsername);

  const auctionBidsCount = document.getElementById("auction-bids-count");
  liveBidsCount(bids, auctionBidsCount);
  auctionBidsCount.classList.remove(
    "animate-pulse",
    "bg-white/50",
    "rounded-full",
    "w-[100px]",
    "h-[54px]",
  );

  const auctionBids = document.getElementById("auction-bids");
  if (bids.length > 0) {
    auctionBids.innerHTML =
      bids.length > 1 ? `${bids.length} bids` : `${bids.length} bid`;
  } else {
    auctionBids.innerHTML = "No bids";
  }

  const auctionEndsIn = document.getElementById("auction-ends-in");
  liveCountdown(endsAt, auctionEndsIn);

  const auctionDescription = document.getElementById("auction-description");
  auctionDescription.classList.remove(
    "animate-pulse",
    "bg-white/50",
    "rounded-full",
    "w-full",
    "h-4",
  );
  auctionDescription.innerHTML = auction.description;
}
