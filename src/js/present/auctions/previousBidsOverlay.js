export function previousBidsOverlay(bids) {
  const main = document.querySelector("main");
  main.insertAdjacentHTML(
    "beforeend",
    `    <div id="overlay-bid-container"
        class="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
        <div id="overlay-content" class="flex flex-col gap-5 m-5 items-center bg-yellowBrand rounded-[20px] p-5 z-[51] max-h-[90vh]">
            <article id="overlay-message" class="hidden">
            </article>
            <h2 class="font-sans font-semibold text-2xl">Bids</h2>
            <ul class="flex flex-col gap-4 px-3 pb-3 overflow-y-auto thin-scrollbar" id="previous-bids">
            </ul>
            <div>
                <button id="overlay-close-button" class="btn ">
                    Close
                </button>
            </div>
        </div>
        <div id="overlay-bid-background"
            class="absolute top-0 left-0 w-full h-full bg-blackBrand opacity-75 z-[49]"></div>
    </div>`,
  );
  const overlayCloseButton = document.getElementById("overlay-close-button");
  const overlayBidBackground = document.getElementById(
    "overlay-bid-background",
  );
  const overlayBidContainer = document.getElementById("overlay-bid-container");
  const bidsArray = bids;
  const reversedBidsArray = [];
  for (let i = bidsArray.length - 1; i >= 0; i--) {
    reversedBidsArray.push(bidsArray[i]);
  }
  const ul = document.getElementById("previous-bids");
  const body = document.querySelector("body");

  overlayBidBackground.addEventListener("click", () => {
    body.classList.remove("overflow-hidden");
    overlayBidContainer.remove();
  });

  overlayCloseButton.addEventListener("click", () => {
    body.classList.remove("overflow-hidden");
    overlayBidContainer.remove();
  });

  reversedBidsArray.forEach((bid) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    const p = document.createElement("p");
    li.classList.add("flex", "gap-2");
    link.href = `/profile/?username=${bid.bidder.name}`;
    link.textContent = `${bid.bidder.name}`;
    link.classList.add(
      "font-sans",
      "underline-offset-2",
      "underline",
      "font-semibold",
    );
    p.textContent = `bid ${bid.amount} credit`;
    li.append(link, p);
    ul.append(li);
  });
}
