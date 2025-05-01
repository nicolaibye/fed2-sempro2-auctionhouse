import { loginUrl } from "/src/js/const/api.js";
import { addToSessionStorage } from "/src/js/helpers/addToSessionStorage.js";

export async function loginApiCall(data) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };

    const response = await fetch(loginUrl, options);
    const userData = await response.json();
    const user = userData.data;

    addToSessionStorage("token", user.accessToken);
    addToSessionStorage("username", user.name);
    addToSessionStorage("avatar", user.avatar.url);

    if (!response.ok) {
        throw new Error(data.errors?.[0]?.message || "Login failed");
    }

    return user;
}