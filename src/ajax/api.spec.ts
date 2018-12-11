import Api from "./api";

const api = new Api();

describe("./src/ajax/api.ts", () => {
  describe("api.getPhotos()", () => {
    it("searches flickr", async () => {
      const puppies = await api.getPhotos("puppies", "tags");
      expect(puppies).not.toBeNull();
      expect(puppies.searchTerm).toBe("puppies");
      expect(puppies.searchType).toBe("tags");
      expect(puppies.pageNumber).toBe(1);
      expect(puppies.stat).toBe("ok");
    });
    it("can chain searches", async () => {
      const kitties = await api.getPhotos("kitties", "text");
      expect(kitties).not.toBeNull();
      expect(kitties.searchTerm).toBe("kitties");
      expect(kitties.searchType).toBe("text");
      expect(kitties.pageNumber).toBe(1);
      expect(kitties.stat).toBe("ok");
    });
  });
});
