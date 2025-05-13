import { updateProfileOverlay } from "/src/js/present/profile/updateProfileOverlay.js";

export function userAdmin(profile) {
  const bioButtons = document.getElementById("bio-buttons");
  bioButtons.innerHTML = "";

  const editBioButton = document.createElement("button");
  editBioButton.textContent = "Edit Profile";
  editBioButton.classList.add("btn", "w-32");
  editBioButton.type = "button";
  editBioButton.tabIndex = 0;
  bioButtons.append(editBioButton);
  editBioButton.addEventListener("click", () => {
    const body = document.querySelector("body");
    body.classList.add("overflow-hidden");
    updateProfileOverlay(profile);
    const overlay = document.getElementById("overlay-container");
    const focusElements = overlay.querySelector(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
    );
    if (focusElements) {
      focusElements.focus();
    }
  });
}
