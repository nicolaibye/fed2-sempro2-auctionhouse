import { auctionHandler } from "./js/logic/auctions/auctionHandler";
import "./style.css";

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
      break;
    case "/register/":
    case "/register/index.html":
      break;
    case "/profile/":
    case "/profile/index.html":
      break;
  }
}

router();
