import * as React from "react";
import * as ReactDOM from "react-dom";
import { StyleSheetTestUtils } from "aphrodite";
import App from "./App";
describe("App", () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });
});
