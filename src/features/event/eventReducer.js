import { createReducer } from '../../app/common/util/reducerUtil';
import {  CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT} from './eventConstants';

const initialState = [
    {
      id: "1",
      title: "Trip to Tower of London",
      date: "2018-03-27",
      category: "culture",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
      city: "London, UK",
      venue: "Tower of London, St Katharine's & Wapping, London",
      hostedBy: "Bob",
      hostPhotoURL: "https://randomuser.me/api/portraits/men/20.jpg",
      attendees: [
        {
          id: "a",
          name: "Bob",
          photoURL: "https://randomuser.me/api/portraits/men/20.jpg"
        },
        {
          id: "b",
          name: "Tom",
          photoURL: "https://randomuser.me/api/portraits/men/22.jpg"
        }
      ]
    },
    {
      id: "2",
      title: "Trip to Punch and Judy Pub",
      date: "2018-03-28",
      category: "drinks",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
      city: "London, UK",
      venue: "Punch & Judy, Henrietta Street, London, UK",
      hostedBy: "Tom",
      hostPhotoURL: "https://randomuser.me/api/portraits/men/22.jpg",
      attendees: [
        {
          id: "b",
          name: "Tom",
          photoURL: "https://randomuser.me/api/portraits/men/22.jpg"
        },
        {
          id: "a",
          name: "Bob",
          photoURL: "https://randomuser.me/api/portraits/men/20.jpg"
        }
      ]
    }
  ];

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