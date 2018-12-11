import * as React from "react";
import "./App.sass";
import { Provider } from "react-redux";
import store from "./store/createStore";
import SearchArea from './containers/SearchArea';
import DisplayArea from './containers/DisplayArea';
class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <div className="app-content">
          <SearchArea />
          <DisplayArea />
        </div>
      </Provider>
    );
  }
}

export default App;
