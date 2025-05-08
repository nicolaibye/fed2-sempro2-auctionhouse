import { getFromSessionStorage } from "/src/js/helpers/getFromSessionStorage.js";
import { listingUrl, noroffKey } from "/src/js/const/api.js";
import { displayMessage } from "/src/js/present/common/displayMessage.js";

export async function bidApiCall(id, bidValue) {
  const url = `${listingUrl}/${id}/bids`;
  const token = getFromSessionStorage("token");
  if (!token) {
    throw new Error("Your not authorized to bid on this auction.");
  }
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": noroffKey,
      },
      body: JSON.stringify({ amount: bidValue }),
    };
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.errors?.[0]?.message || "Failed to bid on auction");
    } else {
      window.alert("Bid placed successfully.");
      window.location.reload();
    }
    return data;
  } catch (error) {
    console.error("There was a problem with making a bid:", error.message);
    displayMessage("#message", "error", error.message);
    return;
  }
}
