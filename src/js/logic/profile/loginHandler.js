import { loginApiCall } from "/src/js/data/profile/loginApiCall.js";
import { displayMessage } from "/src/js/present/common/displayMessage.js";

export function loginHandler() {
  const form = document.getElementById("login");

  if (form) {
    form.addEventListener("submit", submitForm);
  }
}

async function submitForm(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  try {
    await loginApiCall(data);
    displayMessage("#message", "success", "Login successful. Redirecting...");
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  } catch (error) {
    console.error("Login error:", error);
    displayMessage("#message", "error", error.message);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}
