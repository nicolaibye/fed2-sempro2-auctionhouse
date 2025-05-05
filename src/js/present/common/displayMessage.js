export function displayMessage(container, type, message) {
  let messageContainer = container;
  if (typeof container === "string") {
    messageContainer = document.querySelector(container);
  }

  messageContainer.innerHTML = `<p class="message ${type}">${message}</p>`;

  setTimeout(() => {
    messageContainer.innerHTML = "";
    messageContainer.classList.remove(type);
  }, 3000);
}
