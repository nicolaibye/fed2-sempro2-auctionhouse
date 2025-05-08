import { displayMessage } from "/src/js/present/common/displayMessage.js";
import { fetchProfile } from "/src/js/data/profile/fetchProfile.js";
import { userProfileBio } from "/src/js/present/profile/userProfileBio.js";
import { getFromSessionStorage } from "/src/js/helpers/getFromSessionStorage.js";
import { fetchProfileAuctions } from "/src/js/data/fetchProfileAuctions.js";
import { createAuctions } from "/src/js/present/auctions/createAuctions.js";
import { userAdmin } from "/src/js/logic/profile/userAdmin.js";
import { fetchAuctionById } from "/src/js/data/fetchAuctionById.js";
import { searchAuctions } from "../auctions/searchAuctions";

export async function profileHandler() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const username = urlParams.get("username");

  try {
    const profile = await fetchProfile(username);
    if (profile) {
      userProfileBio(profile);
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    displayMessage("#message", "error", error.message);
  }

  try {
    const auctions = await fetchProfileAuctions(username);
    const auctionsData = auctions.data;
    const detailedAuctions = await Promise.all(
      auctionsData.map((auction) => fetchAuctionById(auction.id)),
    );
    if (auctions) {
      createAuctions("#auctionsProfile", detailedAuctions);
      searchAuctions("#auctionsProfile", detailedAuctions);
    }
  } catch (error) {
    console.error("Error fetching profile auctions:", error);
    displayMessage("#message", "error", error.message);
  }

  const usernameStorage = getFromSessionStorage("username");
  if (username === usernameStorage) {
    userAdmin();
  }
}
