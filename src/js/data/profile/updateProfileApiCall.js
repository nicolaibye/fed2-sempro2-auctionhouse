import { profileUrl } from "/src/js/const/api.js";
import { getFromSessionStorage } from "/src/js/helpers/getFromSessionStorage.js";
import { noroffKey } from "/src/js/const/api.js";

export async function updateProfileApiCall(username, data) {
  const url = `${profileUrl}/${username}`;
  const token = getFromSessionStorage("token");
  if (!token) {
    throw new Error("Your not authorized to update this profile.");
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
  const userData = await response.json();
  const user = userData.data;

  if (!response.ok) {
    throw new Error(userData.errors?.[0]?.message || "Update failed");
  }

  return user;
}
