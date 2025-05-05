import { getFromSessionStorage } from "/src/js/helpers/getFromSessionStorage.js";
import { noroffKey, profileUrl } from "/src/js/const/api.js";

export async function fetchProfileAuctions(username) {
  const token = getFromSessionStorage("token");
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": noroffKey,
    },
  };

  const response = await fetch(`${profileUrl}/${username}/listings`, options);
  const data = await response.json();

  return data;
}
