import {  createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers/rootReducer';
import {  composeWithDevTools} from 'redux-devtools-extension'


export const configureStore = (preloadedState) => {
   const middlewares = [];
   const middlewareEnhancer = applyMiddleware(...middlewares)

   const storeEnhancers =  [middlewareEnhancer];

   const composedEnhancer = composeWithDevTools(...storeEnhancers);

   const store = createStore(
       rootReducer,
       preloadedState,
       composedEnhancer
   );

   if(process.env.NODE_ENV !== "production"){
     if(module.hot){
         module.hot.accept('../reducers/rootReducer', () => {
             const newRootReducer = require("../reducers/rootReducer").default;
             store.replaceReducer(newRootReducer);//this replace reducer is used if you want to implement code splitting or load reducers dynamically or implement hot module reolad for redux
         } );
     }
   }

   return store;
}

