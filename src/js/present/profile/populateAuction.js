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

  const auctionImage = document.getElementById("auction-image");
  auctionImage.src = media[0]?.url;
  auctionImage.alt = media[0]?.alt || `${title} auction image`;

  const auctionTitle = document.getElementById("auction-title");
  auctionTitle.textContent = title;

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
    });
  } else {
    auctionTags.textContent = "";
  }

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
  auctionDescription.innerHTML = auction.description;
}

{
  /* <article id="message">
</article>
<p class="text-sm mx-10"><a href="#">Animals</a> / <span class="text-purpleBrand">Women with crow</span></p>
<div class="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-5 max-w-[1200px] md:mx-5 md:mt-5 lg:mx-auto">

            <label for="bid"
                class="relative outline outline-1 outline-greyBrand rounded-full p-4 px-5 flex items-center gap-2 md:bg-white">
                <input type="number" name="bid" id="bid" placeholder="Amount">
                <button class="btn absolute right-3">Place bid</button>
            </label>
    </section>
    <section class="md:col-span-2">
        <div class="flex flex-col m-5 gap-5 bg-yellowBrand rounded-[20px] p-5">
            <p class="font-semibold text-2xl">You might also like</p>
            <div class="flex overflow-x-scroll no-scrollbar">
                <ul class="flex flex-nowrap gap-5">
                    <li
                        class="aspect-square w-56 flex flex-col bg-purpleBrand rounded-[20px] relative max-w-[390px] w-full h-[220px] overflow-hidden">
                        <img class="w-full h-2/3 object-cover rounded-[20px] outline-2 outline -outline-offset-2 outline-purpleBrand"
                            src="/mockup.jpg" alt="Latest Auction Image">
                        <div class="flex gap-2 p-2 px-5 justify-between items-center">
                            <div>
                                <p class="text-white">Women with crow</p>
                                <div class="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"
                                        viewBox="0 0 15 15" fill="none">
                                        <circle cx="7.40582" cy="7.59418" r="7.40582" fill="white" />
                                        <path
                                            d="M7.48411 12.2814C4.65947 12.2814 2.63196 10.3232 2.63196 7.58524C2.63196 4.84723 4.65947 2.90637 7.48411 2.90637C9.13038 2.90637 10.4994 3.58221 11.2272 4.86456L9.96218 5.67903C9.37299 4.77792 8.47187 4.36202 7.46678 4.36202C5.66455 4.36202 4.31288 5.62704 4.31288 7.58524C4.31288 9.57808 5.66455 10.8258 7.46678 10.8258C8.47187 10.8258 9.37299 10.4099 9.96218 9.50877L11.2272 10.3059C10.4994 11.5883 9.13038 12.2814 7.48411 12.2814Z"
                                            fill="#632677" />
                                        <rect x="7.35474" y="6.39465" width="1.69649" height="1.69649"
                                            transform="rotate(45 7.35474 6.39465)" fill="#632677" />
                                    </svg>
                                    <p class="font-semibold text-xl text-white">333</p>
                                </div>
                            </div>
                            <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="19"
                                    viewBox="0 0 18 19" fill="none">
                                    <path d="M8.47357 17L15.9736 9.5L8.47357 2" stroke="#FFFFFF"
                                        stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M2.00004 9.5L13.2499 9.5" stroke="#FFFFFF" stroke-width="3"
                                        stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 5" />
                                </svg></a>
                        </div>
                    </li>
                    <li
                        class="aspect-square w-56 flex flex-col bg-purpleBrand rounded-[20px] relative max-w-[390px] w-full h-[220px] overflow-hidden">
                        <img class="w-full h-2/3 object-cover rounded-[20px] outline-2 outline -outline-offset-2 outline-purpleBrand"
                            src="/mockup.jpg" alt="Latest Auction Image">
                        <div class="flex gap-2 p-2 px-5 justify-between items-center">
                            <div>
                                <p class="text-white">Women with crow</p>
                                <div class="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"
                                        viewBox="0 0 15 15" fill="none">
                                        <circle cx="7.40582" cy="7.59418" r="7.40582" fill="white" />
                                        <path
                                            d="M7.48411 12.2814C4.65947 12.2814 2.63196 10.3232 2.63196 7.58524C2.63196 4.84723 4.65947 2.90637 7.48411 2.90637C9.13038 2.90637 10.4994 3.58221 11.2272 4.86456L9.96218 5.67903C9.37299 4.77792 8.47187 4.36202 7.46678 4.36202C5.66455 4.36202 4.31288 5.62704 4.31288 7.58524C4.31288 9.57808 5.66455 10.8258 7.46678 10.8258C8.47187 10.8258 9.37299 10.4099 9.96218 9.50877L11.2272 10.3059C10.4994 11.5883 9.13038 12.2814 7.48411 12.2814Z"
                                            fill="#632677" />
                                        <rect x="7.35474" y="6.39465" width="1.69649" height="1.69649"
                                            transform="rotate(45 7.35474 6.39465)" fill="#632677" />
                                    </svg>
                                    <p class="font-semibold text-xl text-white">333</p>
                                </div>
                            </div>
                            <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="19"
                                    viewBox="0 0 18 19" fill="none">
                                    <path d="M8.47357 17L15.9736 9.5L8.47357 2" stroke="#FFFFFF"
                                        stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M2.00004 9.5L13.2499 9.5" stroke="#FFFFFF" stroke-width="3"
                                        stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 5" />
                                </svg></a>
                        </div>
                    </li>
                    <li
                        class="aspect-square w-56 flex flex-col bg-purpleBrand rounded-[20px] relative max-w-[390px] w-full h-[220px] overflow-hidden">
                        <img class="w-full h-2/3 object-cover rounded-[20px] outline-2 outline -outline-offset-2 outline-purpleBrand"
                            src="/mockup.jpg" alt="Latest Auction Image">
                        <div class="flex gap-2 p-2 px-5 justify-between items-center">
                            <div>
                                <p class="text-white">Women with crow</p>
                                <div class="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"
                                        viewBox="0 0 15 15" fill="none">
                                        <circle cx="7.40582" cy="7.59418" r="7.40582" fill="white" />
                                        <path
                                            d="M7.48411 12.2814C4.65947 12.2814 2.63196 10.3232 2.63196 7.58524C2.63196 4.84723 4.65947 2.90637 7.48411 2.90637C9.13038 2.90637 10.4994 3.58221 11.2272 4.86456L9.96218 5.67903C9.37299 4.77792 8.47187 4.36202 7.46678 4.36202C5.66455 4.36202 4.31288 5.62704 4.31288 7.58524C4.31288 9.57808 5.66455 10.8258 7.46678 10.8258C8.47187 10.8258 9.37299 10.4099 9.96218 9.50877L11.2272 10.3059C10.4994 11.5883 9.13038 12.2814 7.48411 12.2814Z"
                                            fill="#632677" />
                                        <rect x="7.35474" y="6.39465" width="1.69649" height="1.69649"
                                            transform="rotate(45 7.35474 6.39465)" fill="#632677" />
                                    </svg>
                                    <p class="font-semibold text-xl text-white">333</p>
                                </div>
                            </div>
                            <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="19"
                                    viewBox="0 0 18 19" fill="none">
                                    <path d="M8.47357 17L15.9736 9.5L8.47357 2" stroke="#FFFFFF"
                                        stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M2.00004 9.5L13.2499 9.5" stroke="#FFFFFF" stroke-width="3"
                                        stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 5" />
                                </svg></a>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
    </section>
</div> */
}
