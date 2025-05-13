import { expect, describe, it, vi, beforeEach } from "vitest";
import { loginApiCall } from "/src/js/data/profile/loginApiCall.js";
import { loginUrl } from "/src/js/const/api.js";

describe("loginApiCall", () => {
    beforeEach(() => {
        global.fetch = vi.fn();
        sessionStorage.clear();
    });

    it("returns user data and sets token, username and avatar in session storage when loginApiCall is successful", async () => {
        const successResponse = {
            data: {
                accessToken: "123456789",
                name: "John Doe",
                avatar: {
                    url: "https://example.com/avatar.jpg",
                },
            },
        };

        const data = {
            email: "qjK7v@example.com",
            password: "password123",
        };

        fetch.mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue(successResponse),
        });

        const user = await loginApiCall(data);
        expect(fetch).toHaveBeenCalledWith(loginUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        expect(user).toEqual(successResponse.data);
        expect(sessionStorage.getItem("token")).toEqual(successResponse.data.accessToken);
        expect(sessionStorage.getItem("username")).toEqual(successResponse.data.name);
        expect(sessionStorage.getItem("avatar")).toEqual(successResponse.data.avatar.url);
    })

    it("throws an error when loginApiCall fails", async () => {
        fetch.mockResolvedValue({
            ok: false,
            json: vi.fn().mockResolvedValue({ errors: [{ message: "Login failed" }] }),
        });

        await expect(loginApiCall({ email: "qjK7v@example.com", password: "password123" })).rejects.toThrow(
            "Login failed",
        );
        expect(fetch).toHaveBeenCalledWith(loginUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: "qjK7v@example.com", password: "password123" }),
        })
    })
})


// export async function loginApiCall(data) {
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   };

//   const response = await fetch(loginUrl, options);
//   const userData = await response.json();
//   const user = userData.data;

//   addToSessionStorage("token", user.accessToken);
//   addToSessionStorage("username", user.name);
//   addToSessionStorage("avatar", user.avatar.url);

//   if (!response.ok) {
//     throw new Error(data.errors?.[0]?.message || "Login failed");
//   }

//   return user;
// }