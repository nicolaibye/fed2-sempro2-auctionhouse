export function toggleDropdown() {
  const dropdownButton = document.getElementById("dropdown-button");
  const dropdownMenu = document.getElementById("dropdown-menu");

  if (dropdownButton && dropdownMenu) {
    dropdownButton.addEventListener("click", () => {
      dropdownMenu.classList.toggle("opacity-0");
      dropdownMenu.classList.toggle("scale-y-0");
      dropdownMenu.classList.toggle("pointer-events-none");
    });
  }
}
