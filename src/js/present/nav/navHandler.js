import { toggleDropdown } from "/src/js/present/nav/toggleDropdown.js";
import { getFromSessionStorage } from "/src/js/helpers/getFromSessionStorage.js";
import { fetchCreditAmount } from "/src/js/data/profile/fetchCreditAmount.js";

export async function navHandler() {
  toggleDropdown();

  if (sessionStorage.getItem("token")) {
    const avatar = getFromSessionStorage("avatar");
    const username = getFromSessionStorage("username");

    // mobile
    const mobileLogin = document.getElementById("mobile-login");
    mobileLogin.classList.add("hidden");

    const mobileAvatar = document.getElementById("mobile-avatar");
    mobileAvatar.src = avatar;
    mobileAvatar.addEventListener("click", () => {
      if (username) {
        window.location.href = `/profile/?username=${username}`;
      } else {
        window.location.href = "/login/";
      }
    });

    const mobileLogout = document.getElementById("mobile-logout");
    mobileLogout.classList.remove("hidden");
    mobileLogout.classList.add("flex");

    const mobileLogoutButton = document.getElementById("mobile-logout-button");
    mobileLogoutButton.addEventListener("click", () => {
      sessionStorage.clear();
      window.location.href = "/";
    });

    // desktop
    const desktopLogin = document.getElementById("desktop-login");
    desktopLogin.classList.add("hidden");

    const desktopAvatar = document.getElementById("desktop-avatar");
    desktopAvatar.src = avatar;
    desktopAvatar.addEventListener("click", () => {
      if (username) {
        window.location.href = `/profile/?username=${username}`;
      } else {
        window.location.href = "/login/";
      }
    });

    const desktopLogout = document.getElementById("desktop-logout");
    desktopLogout.classList.remove("hidden");
    desktopLogout.classList.add("flex");

    const desktopLogoutButton = document.getElementById(
      "desktop-logout-button",
    );
    desktopLogoutButton.addEventListener("click", () => {
      sessionStorage.clear();
      window.location.href = "/";
    });

    // credit amount
    const creditAmount = document.getElementById("credit-amount");
    try {
     const credit = await fetchCreditAmount(username);
      if (credit) {
        creditAmount.innerText = credit;
      } else {
        creditAmount.innerText = "0";
      }
    }
    catch (error) {
      console.error("Error fetching credit amount:", error);
    }
  } else {
    const creditAmountContainer = document.getElementById("credit-amount-container");
    creditAmountContainer.classList.add("hidden");
  }
}
