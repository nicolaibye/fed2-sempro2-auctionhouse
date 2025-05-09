import { bidApiCall } from "/src/js/data/bidApiCall.js";
import { displayMessage } from "/src/js/present/common/displayMessage.js";

export function placeBid(id) {
  const bidInput = document.getElementById("bid");
  const bidButton = document.getElementById("place-bid-button");

  bidInput.addEventListener("input", () => {
    const bidValue = bidInput.value;
    bidButton.disabled = !bidValue;
  });

  bidButton.addEventListener("click", async () => {
    if (!bidInput.value) {
      displayMessage("#message", "warning", "Please enter a bid amount.");
      return;
    }
    const bidValue = bidInput.value;
    const bidNumber = Number(bidValue);
    try {
      await bidApiCall(id, bidNumber);
    } catch (error) {
      console.error("There was a problem with making a bid:", error.message);
      displayMessage("#message", "error", error.message);
    }
  });
}
