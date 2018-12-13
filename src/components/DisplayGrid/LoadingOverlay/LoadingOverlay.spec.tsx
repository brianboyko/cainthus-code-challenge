import * as React from "react";
import LoadingOverlay from "./index";
import Enzyme from "../../../loadEnzyme";

const snapshot = `<div class="loading-overlay"><img src="Spinner-1s-200px.svg" class="loading-overlay__logo"/><div class="loading-overlay__text">Loading</div></div>`

const { shallow } = Enzyme;
describe("Loading Overlay", () => {
  it("renders", async () => {
    const testRender = shallow(<LoadingOverlay />).html()
    expect(testRender).toBe(snapshot);
  });
});
