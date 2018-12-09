import Api from './api';

const api = new Api(); 

describe("./src/ajax/api.ts", () => {
  it('searches flickr', async () => {
    const puppies = await api.getPhotos('puppies', 1)
    expect(puppies.searchTerm).toBe('puppies');
    expect(puppies.pageNumber).toBe(1);
    expect(puppies.data.stat).toBe('ok');
    expect(puppies.getNextPage).toBeDefined();
  })
  it('can chain searches', async () => {
    const kitties = await api.getPhotos('kitties', 1);
    expect(kitties.searchTerm).toBe('kitties');
    expect(kitties.pageNumber).toBe(1);
    expect(kitties.data.stat).toBe('ok');
    const kitties2 = await kitties.getNextPage();
    expect(kitties2.searchTerm).toBe('kitties');
    expect(kitties2.pageNumber).toBe(2);
    expect(kitties.data.stat).toBe('ok');
    expect(kitties2.data).not.toEqual(kitties.data);
    const kitties3 = await kitties2.getNextPage();
    expect(kitties3.pageNumber).toBe(3); 
    expect(kitties.data.stat).toBe('ok');
    expect(kitties3.data).not.toEqual(kitties.data)
    expect(kitties3.data).not.toEqual(kitties2.data); 
  })
})