import { registerApiCall } from "/src/js/data/profile/registerApiCall.js";
import { displayMessage } from "/src/js/present/common/displayMessage.js";

export function registerHandler() {
  const form = document.getElementById("register");

  if (form) {
    form.addEventListener("submit", subitForm);
  }
}

async function subitForm(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  try {
    await registerApiCall(data);
    displayMessage(
      "#message",
      "success",
      "Registration successful. Redirecting...",
    );
    setTimeout(() => {
      window.location.href = "/login/";
    }, 2000);
  } catch (error) {
    console.error("Registration failed:", error);
    displayMessage("#message", "error", error.message);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}
