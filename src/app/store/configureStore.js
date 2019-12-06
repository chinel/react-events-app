import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/rootReducer";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import { reduxFirestore, getFirestore } from "redux-firestore";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import firebase from "../config/firebase";

const rrfconfig = {
  userProfile: "users",
  attachAuthIsReady: true,
  useFirestoreForProfile: true, //this allows us to use the firstore profile as user profile instead of the auth information as the auth profile information takes a while to update you have to logout and login back
  updateProfileOnLogin: false // this prevents the users firestore profile from updating each time the user logs in
};

export const configureStore = preloadedState => {
  const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const storeEnhancers = [middlewareEnhancer];

  const composedEnhancer = composeWithDevTools(
    ...storeEnhancers,
    reactReduxFirebase(firebase, rrfconfig),
    reduxFirestore(firebase)
  );

  const store = createStore(rootReducer, preloadedState, composedEnhancer);

  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept("../reducers/rootReducer", () => {
        const newRootReducer = require("../reducers/rootReducer").default;
        store.replaceReducer(newRootReducer); //this replace reducer is used if you want to implement code splitting or load reducers dynamically or implement hot module reolad for redux
      });
    }
  }

  return store;
};
