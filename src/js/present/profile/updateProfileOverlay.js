import { displayMessage } from "/src/js/present/common/displayMessage.js";
import { getFromSessionStorage } from "/src/js/helpers/getFromSessionStorage.js";
import { updateProfileApiCall } from "/src/js/data/profile/updateProfileApiCall.js";
import { profileHandler } from "../../logic/profile/profileHandler";

export function updateProfileOverlay(profile) {
  const main = document.querySelector("main");
  main.insertAdjacentHTML(
    "beforeend",
    `<div id="overlay-container"
        class="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
        <div id="overlay-content" class="flex flex-col gap-5 m-5 items-center bg-yellowBrand rounded-[20px] p-5 z-[51] w-[90%] max-w-xl max-h-[90vh] overflow-y-auto">
            <article id="overlay-message" class="hidden">
            </article>
            <img id="overlay-image" class="w-40 h-40 rounded-full object-cover" src="${profile.data.avatar.url}" alt="">
            <form action="" class="flex flex-col gap-5 w-full" id="overlay-form">
                <input class="bg-lightYellowBrand rounded-full p-2 px-4 w-full placeholder:text-blackBrand" type="text"
                    name="avatar" id="avatar" placeholder="Avatar URL" title="Please enter a valid URL starting with http:// or https://" pattern="https?://.*">
                <input class="bg-lightYellowBrand rounded-full p-2 px-4 w-full placeholder:text-blackBrand" type="text"
                    name="banner" id="banner" placeholder="Banner URL" title="Please enter a valid URL starting with http:// or https://" pattern="https?://.*">
                <textarea class="bg-lightYellowBrand rounded-[20px] p-2 px-4 w-full placeholder:text-blackBrand"
                    name="bio" id="bio" cols="30" rows="10" placeholder="Bio"></textarea>
                <div class="flex justify-between items-center">
                    <button id="update-button" class="btn" type="submit">Update</button>
                    <span class="btn text-center py-1 cursor-pointer" id="cancel-button">Cancel</span>
                </div>
            </form>
        </div>
        <div id="overlay-background"
            class="absolute top-0 left-0 w-full h-full bg-blackBrand opacity-75 z-[49]"></div>
    </div>`,
  );

  const overlayContainer = document.getElementById("overlay-container");
  const cancelButton = document.getElementById("cancel-button");
  const overlayBackground = document.getElementById("overlay-background");
  const overlayForm = document.getElementById("overlay-form");

  overlayForm.addEventListener("submit", submitProfileForm);
  cancelButton.addEventListener("click", () => {
    const body = document.querySelector("body");
    body.classList.remove("overflow-hidden");
    overlayContainer.remove();
  });
  overlayBackground.addEventListener("click", () => {
    const body = document.querySelector("body");
    body.classList.remove("overflow-hidden");
    overlayContainer.remove();
  });
}

async function submitProfileForm(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const username = getFromSessionStorage("username");
  const bio = formData.get("bio");
  const avatar = formData.get("avatar");
  const banner = formData.get("banner");
  const data = {
    ...(bio && bio.trim() !== "" ? { bio: bio } : {}),
    ...(avatar && avatar.trim() !== ""
      ? {
          avatar: {
            url: avatar,
            alt: `${username}'s profile picture`,
          },
        }
      : {}),
    ...(banner && banner.trim() !== ""
      ? {
          banner: {
            url: banner,
            alt: `${username}'s profile banner`,
          },
        }
      : {}),
  };

  try {
    await updateProfileApiCall(username, data);
    displayMessage(
      "#overlay-message",
      "success",
      "Profile updated successfully.",
    );
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } catch (error) {
    console.error("Profile update failed:", error);
    displayMessage("#overlay-message", "error", error.message);
  }
}
