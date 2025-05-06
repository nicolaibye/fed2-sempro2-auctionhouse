import { getFromSessionStorage } from "/src/js/helpers/getFromSessionStorage.js";
import { createAuctionApiCall } from "/src/js/data/createAuctionApiCall.js";
import { displayMessage } from "/src/js/present/common/displayMessage.js";

export function createAuctionOverlay() {
  const token = getFromSessionStorage("token");

  if (token) {
    const main = document.querySelector("main");
    main.insertAdjacentHTML(
      "beforeend",
      `    <div id="overlay-auction-container"
        class="absolute top-0 left-0 w-full h-full flex justify-center items-center z-50">
        <div id="overlay-content" class="flex flex-col gap-5 m-5 items-center bg-yellowBrand rounded-[20px] p-5 z-[51]">
            <article id="overlay-message" class="hidden">
            </article>
            <img id="overlay-image" class="w-full h-40 rounded-[20px] object-contain bg-lightPurpleBrand"
                src="/mockup.jpg" alt="Preview of uploaded image">
            <form action="" class="flex flex-col gap-3 w-full mb-0" id="overlay-auction-form">
                <input class="bg-lightYellowBrand rounded-full p-2 px-4 w-full placeholder:text-blackBrand" type="text"
                    name="title" id="title" placeholder="Title" required>
                <div class="flex justify-between gap-2">
                    <span
                        class="grow cursor-pointer bg-lightYellowBrand rounded-full p-2 px-4 text-center hover:bg-purpleBrand hover:text-white transition-colors duration-200"
                        id="category-button">Category</span>
                    <input type="date"
                        class="bg-lightYellowBrand rounded-full p-2 px-4 grow-[2] placeholder:text-blackBrand"
                        name="date" id="date" placeholder="Date" required>
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
                <input type="url" name="image" id="image"
                    class="bg-lightYellowBrand rounded-full p-2 px-4 w-full placeholder:text-blackBrand"
                    placeholder="Image URL" title="Please enter a valid URL starting with http:// or https://"
                    pattern="https?://.*" required>
                <div class="flex justify-between items-center">
                    <button id="create-button" class="btn" type="submit">Create</button>
                    <span class="btn text-center py-1 cursor-pointer" id="cancel-button">Cancel</span>
                </div>
                <p class="text-sm font-sans text-center">By creating this auction you agree to our <a href="#"
                        class="underline-offset-2 underline">policies.</a></p>
            </form>
        </div>
        <div id="overlay-auction-background"
            class="absolute top-0 left-0 w-full h-full bg-blackBrand opacity-75 z-[49]"></div>
    </div>`,
    );
    const overlayAuctionContainer = document.getElementById(
      "overlay-auction-container",
    );
    const cancelButton = document.getElementById("cancel-button");
    const categoryButton = document.getElementById("category-button");
    const categoryContainer = document.getElementById("category-container");
    const overlayBackground = document.getElementById(
      "overlay-auction-background",
    );
    const overlayForm = document.getElementById("overlay-auction-form");

    categoryButton.addEventListener("click", () => {
      categoryContainer.classList.toggle("hidden");
      categoryContainer.classList.toggle("flex");
      categoryButton.classList.toggle("bg-purpleBrand");
      categoryButton.classList.toggle("text-white");
    });

    overlayForm.addEventListener("submit", submitAuctionForm);

    cancelButton.addEventListener("click", () => {
      overlayAuctionContainer.remove();
    });
    overlayBackground.addEventListener("click", () => {
      overlayAuctionContainer.remove();
    });
  }

  async function submitAuctionForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get("title");
    const date = formData.get("date");
    const description = formData.get("description");
    const image = formData.get("image");
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
      endsAt: new Date(date).toISOString(),
      ...(description && description.trim() !== ""
        ? { description }
        : { description: "No description has been provided" }),
      media: [
        {
          url: image,
          alt: `${title} auction image`,
        },
      ],
      ...(tags.length > 0 ? { tags } : {}),
    };

    try {
      await createAuctionApiCall(data);
      displayMessage(
        "#overlay-message",
        "success",
        "Auction created successfully.",
      );
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Auction creation failed:", error);
      displayMessage("#overlay-message", "error", error.message);
    }
  }
}
