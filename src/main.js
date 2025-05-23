import { auctionHandler } from "./js/logic/auctions/auctionHandler";
import { auctionByIdHandler } from "./js/logic/auctions/auctionByIdHandler";
import { loginHandler } from "./js/logic/profile/loginHandler";
import { profileHandler } from "./js/logic/profile/profileHandler";
import { registerHandler } from "./js/logic/profile/registerHandler";
import { navHandler } from "./js/present/nav/navHandler";
import { categoryHandler } from "./js/logic/auctions/categoryHandler";
import "./style.css";
import { tabindexEnter } from "./js/helpers/tabindexEnter";

navHandler();
tabindexEnter();

function router() {
  const pathname = window.location.pathname;
  switch (pathname) {
    case "/":
    case "/index.html":
      auctionHandler("auctionsHome", 4);
      break;
    case "/auctions/":
    case "/auctions/index.html":
      auctionHandler("auctionsAll");
      categoryHandler("filter-form", "category-filter-button");
      break;
    case "/auctions/item/":
    case "/auctions/item/index.html":
      auctionByIdHandler();
      break;
    case "/login/":
    case "/login/index.html":
      loginHandler();
      break;
    case "/register/":
    case "/register/index.html":
      registerHandler();
      break;
    case "/profile/":
    case "/profile/index.html":
      profileHandler();
      break;
  }
}

router();
