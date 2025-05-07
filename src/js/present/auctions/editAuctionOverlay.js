import { getFromSessionStorage } from "/src/js/helpers/getFromSessionStorage.js";
import { noroffKey, listingUrl } from "/src/js/const/api.js";
import { displayMessage } from "/src/js/present/common/displayMessage.js";
import { updateAuctionApiCall } from "/src/js/data/updateAuctionApiCall.js";

export async function editAuctionOverlay(auction) {
  const { id, title, description, media, tags } = auction;
  const queryParams = new URLSearchParams(window.location.search);
  queryParams.set("id", id);
  const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
  window.history.pushState({}, "", newUrl);
  const auctionImage = media[0]?.url;
  const auctionImageAlt = media[0]?.alt;
  const main = document.querySelector("main");
  main.insertAdjacentHTML(
    "beforeend",
    `<div id="overlay-container"
          class="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
          <div id="overlay-content" class="flex flex-col gap-3 items-center bg-yellowBrand rounded-[20px] p-5 z-[51] w-[90%] max-w-xl max-h-[90vh] overflow-y-auto">
              <article id="overlay-message" class="hidden">
              </article>
            <img id="overlay-image" class="w-full h-40 rounded-[20px] object-contain bg-lightPurpleBrand"
                src="${auctionImage}" alt="${auctionImageAlt}">
              <form action="" class="flex flex-col gap-3 w-full" id="overlay-form">
                <div class="flex flex-col sm:flex-row justify-between gap-2">
                    <input type="title"
                        class="bg-lightYellowBrand rounded-full p-2 px-4 grow-[2] placeholder:text-blackBrand"
                        name="title" id="title" placeholder="Title" required>
                    <span
                        class="grow cursor-pointer bg-lightYellowBrand rounded-full p-2 px-4 sm:text-center hover:bg-purpleBrand hover:text-white transition-colors duration-200"
                        id="category-button">Category</span>
                </div>
                <div class="hidden flex-wrap gap-2 justify-center" id="category-container">
                    <div>
                        <input type="checkbox" id="tag-1" name="tag-1" class="hidden peer" value="Art">
                        <label for="tag-1"
                            class="cursor-pointer py-1 px-2 bg-lightYellowBrand rounded-full hover:bg-purpleBrand hover:text-white transition-colors duration-200 peer-checked:bg-purpleBrand peer-checked:text-white">Art</label>
                    </div>
                    <div>
                        <input type="checkbox" id="tag-2" name="tag-2" class="hidden peer" value="Memes">
                        <label for="tag-2"
                            class="cursor-pointer py-1 px-2 bg-lightYellowBrand rounded-full hover:bg-purpleBrand hover:text-white transition-colors duration-200 peer-checked:bg-purpleBrand peer-checked:text-white">Memes</label>
                    </div>
                    <div>
                        <input type="checkbox" id="tag-3" name="tag-3" class="hidden peer" value="Animals">
                        <label for="tag-3"
                            class="cursor-pointer py-1 px-2 bg-lightYellowBrand rounded-full hover:bg-purpleBrand hover:text-white transition-colors duration-200 peer-checked:bg-purpleBrand peer-checked:text-white">Animals</label>
                    </div>
                    <div>
                        <input type="checkbox" id="tag-4" name="tag-4" class="hidden peer" value="GIF">
                        <label for="tag-4"
                            class="cursor-pointer py-1 px-2 bg-lightYellowBrand rounded-full hover:bg-purpleBrand hover:text-white transition-colors duration-200 peer-checked:bg-purpleBrand peer-checked:text-white">GIF</label>
                    </div>
                    <div>
                        <input type="checkbox" id="tag-5" name="tag-5" class="hidden peer" value="Nature">
                        <label for="tag-5"
                            class="cursor-pointer py-1 px-2 bg-lightYellowBrand rounded-full hover:bg-purpleBrand hover:text-white transition-colors duration-200 peer-checked:bg-purpleBrand peer-checked:text-white">Nature</label>
                    </div>
                    <div>
                        <input type="checkbox" id="tag-6" name="tag-6" class="hidden peer" value="Other">
                        <label for="tag-6"
                            class="cursor-pointer py-1 px-2 bg-lightYellowBrand rounded-full hover:bg-purpleBrand hover:text-white transition-colors duration-200 peer-checked:bg-purpleBrand peer-checked:text-white">Other</label>
                    </div>
                </div>
                <textarea class="bg-lightYellowBrand rounded-[20px] p-2 px-4 w-full placeholder:text-blackBrand"
                    name="description" id="description" cols="30" rows="5" placeholder="Description"></textarea>
                  <div class="flex flex-wrap justify-center items-center gap-3">
                      <button id="update-button" class="btn" type="submit">Update</button>
                      <span class="btn text-center py-1 cursor-pointer bg-errorDark outline-errorDark hover:text-errorDark" id="delete-button">Delete</span>
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
  const deleteButton = document.getElementById("delete-button");
  const categoryButton = document.getElementById("category-button");
  const categoryContainer = document.getElementById("category-container");

  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  titleInput.value = title;
  descriptionInput.value = description;

  const tagCheckboxes = document.querySelectorAll("input[type=checkbox]");
  tagCheckboxes.forEach((checkbox) => {
    const label = document.querySelector(`label[for=${checkbox.id}]`);
    const labelText = label?.textContent.trim();
    if (tags.includes(labelText)) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
  });

  categoryButton.addEventListener("click", () => {
    categoryContainer.classList.toggle("hidden");
    categoryContainer.classList.toggle("flex");
    categoryButton.classList.toggle("bg-purpleBrand");
    categoryButton.classList.toggle("text-white");
  });

  overlayForm.addEventListener("submit", submitUpdateForm);
  deleteButton.addEventListener("click", async () => {
    const confirmation = confirm(
      "Are you sure you want to delete this auction? This action cannot be undone.",
    );
    if (!confirmation) {
      const body = document.querySelector("body");
      body.classList.remove("overflow-hidden");
      overlayContainer.remove();
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.delete("id");
      const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
      window.history.pushState({}, "", newUrl);
      return;
    }
    try {
      await deleteAuction(auction);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting auction:", error);
      displayMessage("#overlay-message", "error", error.message);
    }
  });

  cancelButton.addEventListener("click", () => {
    const body = document.querySelector("body");
    body.classList.remove("overflow-hidden");
    overlayContainer.remove();
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.delete("id");
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.pushState({}, "", newUrl);
  });
  overlayBackground.addEventListener("click", () => {
    const body = document.querySelector("body");
    body.classList.remove("overflow-hidden");
    overlayContainer.remove();
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.delete("id");
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.pushState({}, "", newUrl);
  });
}

async function submitUpdateForm(event) {
  event.preventDefault();
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  const formData = new FormData(event.target);
  const title = formData.get("title");
  const description = formData.get("description");
  const tags = [];
  const tagInputs = document.querySelectorAll(
    "#category-container input[type='checkbox']",
  );
  tagInputs.forEach((input) => {
    if (input.checked) {
      tags.push(input.value);
    }
  });
  const data = {
    title,
    ...(description && description.trim() !== ""
      ? { description }
      : { description: "No description has been provided" }),
    ...(tags.length > 0 ? { tags } : {}),
  };
  console.log(data);

  try {
    await updateAuctionApiCall(id, data);
    displayMessage(
      "#overlay-message",
      "success",
      "Auction updated successfully.",
    );
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } catch (error) {
    console.error("Auction creation failed:", error);
    displayMessage("#overlay-message", "error", error.message);
  }
}

async function deleteAuction(auction) {
  const token = getFromSessionStorage("token");
  const auctionId = auction.id;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": noroffKey,
    },
  };

  const response = await fetch(`${listingUrl}/${auctionId}`, options);
  if (!response.ok) {
    throw new Error("Failed to delete auction");
  }
}
