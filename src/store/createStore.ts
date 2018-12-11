import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import * as photos from "./reducers/photos";

const environment: string | undefined = process.env.NODE_ENV;

const middlewares: any[] = [thunk];
if (environment === "development") {
  middlewares.push(createLogger());
}

const enhancer = compose(applyMiddleware(...middlewares));
const appReducer = combineReducers({ 
  ...photos
 });
const rootReducer = (state: any = {}, action: any = {}) => {
  // this spot would be ideal for any debug code that
  // needs to intercept state or actions
  return appReducer(state, action);
};

export const configureStore = (initialState: any = {}) =>
  createStore(rootReducer, initialState, enhancer);

export default configureStore();
