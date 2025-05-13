export function tabindexEnter() {
  document.addEventListener("keydown", (event) => {
    // Only act on Enter or Space
    if (event.key !== "Enter" && event.key !== " ") return;

    const active = document.activeElement;

    // Only trigger if the element is focusable and has a role or class that suggests interactivity
    if (
      active &&
      active.getAttribute("tabindex") === "0" ||
      (active.getAttribute("role") === "button")
    ) {
      event.preventDefault(); // Prevent scrolling on Space
      active.click();
    }
  });
}
