import { AccessLinkUseCase } from "./access-link";
import { LinkRepositoryInterface } from "@/data/protocols/db/link/link-repository.interface";

describe("AccessLinkUseCase", () => {
  let linkRepository: LinkRepositoryInterface;
  let accessLinkUseCase: AccessLinkUseCase;

  beforeEach(() => {
    linkRepository = {
      findByShorterUrl: jest.fn(),
    } as unknown as LinkRepositoryInterface;

    accessLinkUseCase = new AccessLinkUseCase(linkRepository);
  });

  it("should return the original URL when a valid short link is provided", async () => {
    const shortLink = "abc123";
    const expectedOriginalUrl = "https://example.com/original-url";

    (linkRepository.findByShorterUrl as jest.Mock).mockResolvedValue({
      originaUrl: expectedOriginalUrl,
    });

    const result = await accessLinkUseCase.execute(shortLink);

    expect(result).toBe(expectedOriginalUrl);
    expect(linkRepository.findByShorterUrl).toHaveBeenCalledWith(shortLink);
  });

  it("should handle errors gracefully", async () => {
    const shortLink = "abc123";

    (linkRepository.findByShorterUrl as jest.Mock).mockRejectedValue(
      new Error("Link not found")
    );

    await expect(accessLinkUseCase.execute(shortLink)).rejects.toThrow(
      "Link not found"
    );
  });
});
