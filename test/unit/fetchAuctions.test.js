import { expect, describe, it, beforeEach, vi } from "vitest";
import { fetchAuctions } from "/src/js/data/fetchAuctions.js";

describe("fetchAuctions", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it("returns an array of auctions when the API call is successful", async () => {
    const successResponse = {
      data: [
        {
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
        },
      ],
    };

    fetch.mockResolvedValue({
      ok: true,
      json: () => successResponse,
    });

    const auctions = await fetchAuctions();
    expect(auctions).toEqual(successResponse.data);
  });

  it("throws an error when the API call fails", async () => {
    fetch.mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ errors: [{ message: "Failed to fetch auctions" }] }),
    });

    await expect(fetchAuctions()).rejects.toThrow("Failed to fetch auctions");
  });
});
