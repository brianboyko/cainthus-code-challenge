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
    it("does more than puppies", async () => {
      const kitties = await api.getPhotos("kitties", "text");
      expect(kitties).not.toBeNull();
      expect(kitties.searchTerm).toBe("kitties");
      expect(kitties.searchType).toBe("text");
      expect(kitties.pageNumber).toBe(1);
      expect(kitties.stat).toBe("ok");
    });
  });
  describe("api.getAndProcessPhotos()", () => {
    it("searches flickr", async () => {
      const puppies: any = await api.getAndProcessPhotos("puppies", "tags");
      const keyset: string[] = [
        "id",
        "owner",
        "secret",
        "server",
        "farm",
        "title",
        "taken",
        "tags",
        "username",
        "realname",
      ]
      expect(
        puppies.photo!.every((photo: any) => {
          const photoKeys: Set<string> = new Set(Object.keys(photo))
          return keyset.every((key) => {
            if(photoKeys.has(key)){
              return true;
            }
            console.log({key, photo})
            return false;
          })
        })
      ).toBe(true);
    });
  });
});
