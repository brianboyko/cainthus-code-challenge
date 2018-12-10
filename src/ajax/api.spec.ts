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
      expect(puppies.getNextPage).toBeDefined();
    });
    it("can chain searches", async () => {
      const kitties = await api.getPhotos("kitties", "text");
      expect(kitties).not.toBeNull();
      expect(kitties.searchTerm).toBe("kitties");
      expect(kitties.searchType).toBe("text");
      expect(kitties.pageNumber).toBe(1);
      expect(kitties.stat).toBe("ok");
      const kitties2 = await kitties.getNextPage();
      expect(kitties2).not.toBeNull();
      expect(kitties2!.searchTerm).toBe("kitties");
      expect(kitties2!.searchType).toBe("text");
      expect(kitties2!.pageNumber).toBe(2);
      expect(kitties2!.stat).toBe("ok");
      expect(kitties2).not.toEqual(kitties);
      const kitties3 = await kitties2!.getNextPage();
      expect(kitties3).not.toBeNull();
      expect(kitties3!.pageNumber).toBe(3);
      expect(kitties3!.searchTerm).toBe("kitties");
      expect(kitties3!.searchType).toBe("text");
      expect(kitties3!.stat).toBe("ok");
      expect(kitties3).not.toEqual(kitties);
      expect(kitties3).not.toEqual(kitties2);
    });
  });
});
