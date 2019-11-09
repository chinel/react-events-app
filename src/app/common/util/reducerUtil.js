export const createReducer = (initialState, fnMap) => {  //the fnMap is going to server as a lookup table for our actions
 return (state = initialState, {type,payload}) => {
     const handler = fnMap[type];
     return handler ? handler(state, payload) : state;
 }
}