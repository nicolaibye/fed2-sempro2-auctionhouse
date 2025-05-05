import { updateProfileOverlay } from "/src/js/present/profile/updateProfileOverlay.js";

export function userAdmin() {
  const bioButtons = document.getElementById("bio-buttons");
  bioButtons.innerHTML = "";

  const editBioButton = document.createElement("button");
  editBioButton.textContent = "Edit Profile";
  editBioButton.classList.add("btn", "w-32");
  bioButtons.append(editBioButton);
  editBioButton.addEventListener("click", () => {
    updateProfileOverlay();
  });
}
