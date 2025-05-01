import { auctionHandler } from "./js/logic/auctions/auctionHandler";
import { loginHandler } from "./js/logic/profile/loginHandler";
import { registerHandler } from "./js/logic/profile/registerHandler";
import { navHandler } from "./js/present/nav/navHandler";
import "./style.css";



navHandler();

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
      break;
    case "/auctions/item/":
    case "/auctions/item/index.html":
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
      break;
  }
}

router();
