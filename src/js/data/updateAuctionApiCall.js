import { getFromSessionStorage } from "/src/js/helpers/getFromSessionStorage.js";
import { listingUrl, noroffKey } from "/src/js/const/api.js";

export async function updateAuctionApiCall(id, data) {
    const url = `${listingUrl}/${id}`;
    const token = getFromSessionStorage("token");
    if (!token) {
        throw new Error("Your not authorized to update this auction.");
    }
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": noroffKey,
        },
        body: JSON.stringify(data),
    };    
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error("Failed to update auction");
    }
}