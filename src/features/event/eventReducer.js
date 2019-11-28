import { createReducer } from '../../app/common/util/reducerUtil';
import {  CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT} from './eventConstants';

 const initialState = [];

  export const createEvent = (state, payload) => {  /// The state passed here is the initial state and the payload is what is recieved from the action creators
      return [...state,Object.assign({}, payload.event)];  // using the object.assign you do not mutate the data but rather add a new copy to it using the spread operator
  }

  export const updateEvent = (state, payload) => {
      return [...state.filter(event => event.id !== payload.event.id),Object.assign({}, payload.event)];

  }


  export const deletEvent = (state, payload) => {
      return [...state.filter(event => event.id !== payload.eventId)];
  }

  export default createReducer(initialState, {  //here we passed our initial state and then added our lookup table which is the second parameter that matches each action with its corresponding function
      [CREATE_EVENT] : createEvent,
      [UPDATE_EVENT] : updateEvent,
      [DELETE_EVENT] : deletEvent 
  });