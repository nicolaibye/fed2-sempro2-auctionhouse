import { profileUrl } from "/src/js/const/api.js";
import { getFromSessionStorage } from "/src/js/helpers/getFromSessionStorage.js";
import { noroffKey } from "/src/js/const/api.js";

export async function fetchProfile(username) {
  const token = getFromSessionStorage("token");
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": noroffKey,
    },
  };

  const response = await fetch(`${profileUrl}/${username}`, options);
  const data = await response.json();

  return data;
}
