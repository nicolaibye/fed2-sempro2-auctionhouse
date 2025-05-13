import { expect, describe, it, beforeEach, vi } from "vitest";
import { createAuctionApiCall } from "/src/js/data/createAuctionApiCall.js";

describe("createAuctionApiCall", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
    sessionStorage.clear();
  });

  it("returns auction data when createAuctionApiCall is successful and token is present", async () => {
    const successResponse = {
      title: "Test Auction",
      endsAt: "2023-01-01T00:00:00.000Z",
      description: "Test description",
      media: [
        {
          url: "https://example.com/image.jpg",
          alt: "Test image",
        },
      ],
      tags: ["tag1", "tag2"],
    };

    const token = "123456789";
    sessionStorage.setItem("token", token);

    fetch.mockResolvedValue({
      ok: true,
      json: () => successResponse,
    });

    const data = {
      title: "Test Auction",
      endsAt: "2023-01-01T00:00:00.000Z",
      description: "Test description",
      media: [
        {
          url: "https://example.com/image.jpg",
          alt: "Test image",
        },
      ],
      tags: ["tag1", "tag2"],
    };

    const responseData = await createAuctionApiCall(data);

    expect(responseData).toEqual(successResponse);
  });

  it("throws an error if there is no token in session storage", async () => {
    const data = {
      title: "Test Auction",
      endsAt: "2023-01-01T00:00:00.000Z",
      description: "Test description",
      media: [
        {
          url: "https://example.com/image.jpg",
          alt: "Test image",
        },
      ],
      tags: ["tag1", "tag2"],
    };

    await expect(createAuctionApiCall(data)).rejects.toThrowError(
      "Your not authorized to create an auction.",
    );
  });

  it("throws an error when failed to create an auction", async () => {
    const token = "123456789";
    sessionStorage.setItem("token", token);

    fetch.mockResolvedValue({
      ok: false,
      json: () => {
        throw new Error("Failed to create auction");
      },
    });

    const data = {
      title: "Test Auction",
      endsAt: "2023-01-01T00:00:00.000Z",
      description: "Test description",
      media: [
        {
          url: "https://example.com/image.jpg",
          alt: "Test image",
        },
      ],
      tags: ["tag1", "tag2"],
    };

    await expect(createAuctionApiCall(data)).rejects.toThrowError(
      "Failed to create auction",
    );
  });
});
