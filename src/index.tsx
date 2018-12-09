import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import loadEnvironment from "./loadEnvironment";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

loadEnvironment();

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
