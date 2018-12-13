import * as React from "react";
import Header from "./index";
import Enzyme from "../../loadEnzyme";

const fakeAction = () => null;

const snapshot = `<div class="header"><div class="logo"><div></div></div><div class="logo-type">SapientPhoto</div><div class="header__search-form"><input value="invader zim" class="header__search-form__input"/><button class="header__search-form__button">Search</button></div><div class="header__current-search">cartoon</div></div>`

const { shallow } = Enzyme;
describe("Header", () => {
  it("renders", async () => {
    const testRender = shallow(
      <Header
        handleQueryChange={fakeAction}
        handleGetPhotos={fakeAction}
        searchTerm={"invader zim"}
        searchType={"tags"}
        currentSearchTerm={"cartoon"}
      />
    ).html();
    expect(testRender).toBe(snapshot);
  });
});
