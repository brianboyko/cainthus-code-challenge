import * as React from "react";
import "./App.sass";
import { Provider } from "react-redux";
import SearchArea from "./containers/SearchArea";
import store from "./store/createStore";

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <div className="app-content">
          <SearchArea />
        </div>
      </Provider>
    );
  }
}

export default App;
