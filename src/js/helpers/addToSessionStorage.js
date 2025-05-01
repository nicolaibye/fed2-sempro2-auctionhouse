export function addToSessionStorage(key, value) {
  if (typeof value === "object") {
    sessionStorage.setItem(key, JSON.stringify(value));
  } else {
    sessionStorage.setItem(key, value);
  }
}
