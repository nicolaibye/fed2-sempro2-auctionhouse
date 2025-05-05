import { getFromSessionStorage } from "/src/js/helpers/getFromSessionStorage.js";
import { profileUrl, noroffKey } from "/src/js/const/api.js";

export async function fetchCreditAmount(username) {
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
  const credit = data.data.credits;
  if (!response.ok) {
    throw new Error("Failed to fetch credit amount");
  }
  return credit;
}
