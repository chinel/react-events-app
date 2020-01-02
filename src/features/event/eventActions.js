import { toastr } from "react-redux-toastr";
import {
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS
} from "./eventConstants";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart
} from "../async/asyncActions";
import { fetchSampleData } from "../../app/data/mockApi";
import { createNewEvent } from "../../app/common/util/helpers";
import moment from "moment";
import firebase from "../../app/config/firebase";
import compareAsc from "date-fns/compare_asc";

/* export const fetchEvents = events => {
  return {
    type: FETCH_EVENTS,
    payload: events
  };
}; */

export const createEvent = event => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    //We can as well get the authenticated user information from firestore as well
    const user = firestore.auth().currentUser;
    //We can as well get information from the state when needed as shown below
    const photoURL = getState().firebase.profile.photoURL;
    let newEvent = createNewEvent(user, photoURL, event);
    try {
      let createdEvent = await firestore.add(`events`, newEvent); //firestore add creates a unique id for us
      //We will also be creating a lookup kind of table to store the event and user information to help us in the future if we need query user attending events
      await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
        eventId: createdEvent.id,
        userUid: user.uid,
        eventDate: event.date,
        host: true
      });
      //We will comment this out as we will no longer be storing the event data in our reducer
      /* dispatch({
        type: CREATE_EVENT,
        payload: {
          event
        }
      }); */
      toastr.success("Success!", "Event has been created"); // the first parameter passed is the title while the second is the body
    } catch (error) {
      toastr.error("Oops!", "Something went wrong");
    }
  };
};

export const updateEvent = event => {
  /*  return async dispatch => { */
  return async (dispatch, getState /* , { getFirestore } */) => {
    dispatch(asyncActionStart());
    //changed this to be able to update events in firestore
    //const firestore = getFirestore(); we won't be using getFirestore

    const firestore = firebase.firestore();

    //this is to ensure that the field was changed before it changes the date else it will reset a field that is not a date object to 1970
    if (event.date !== getState().firestore.ordered.events[0].date) {
      event.date = moment(event.date).toDate();
    }
    try {
      /* dispatch({
        type: UPDATE_EVENT,
        payload: {
          event
        }
      }); */

      let eventDocRef = firestore.collection("events").doc(event.id);
      let dateEqual = compareAsc(
        getState().firestore.ordered.events[0].date,
        event.date
      ); //this will check if date is equal it returns 0 if date is equal
      if (dateEqual !== 0) {
        let batch = firestore.batch();
        await batch.update(eventDocRef, event);

        let eventAttendeeRef = firestore.collection("event_attendee");
        let eventAttendeeQuery = await eventAttendeeRef.where(
          "eventId",
          "==",
          event.id
        );
        let eventAttendeeQuerySnap = await eventAttendeeQuery.get();
        for (let i = 0; i < eventAttendeeQuerySnap.docs.length; i++) {
          let eventAttendeeDocRef = await firestore
            .collection("event_attendee")
            .doc(eventAttendeeQuerySnap.docs[i].id);
          await batch.update(eventAttendeeDocRef,{
            eventDate: event.date
          })
        }
        await batch.commit();
      } else {
        await eventDocRef.update(event);
      }
      /*       await firestore.update(`events/${event.id}`, event);
       */

      toastr.success("Success!", "Event has been updated"); // the first parameter passed is the title while the second is the body
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
      toastr.error("Oops!", "Something went wrong");
    }
  };
};

export const cancelToggle = (cancelled, eventId) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const message = cancelled
      ? "Are you sure you want to cancel this event"
      : "This will reactivate the event - are you sure?";
    try {
      toastr.confirm(message, {
        onOk: () =>
          firestore.update(`events/${eventId}`, {
            cancelled: cancelled
          })
      });
    } catch (error) {
      console.log(error);
    }
  };
};

/* export const deleteEvent = eventId => {
  return {
    type: DELETE_EVENT,
    payload: {
      eventId
    }
  };
}; */

/* export const loadEvents = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      let events = await fetchSampleData();
      dispatch(fetchEvents(events));
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
}; */

export const getEventsForDashboard = lastEvent => async (
  dispatch,
  getState
) => {
  let today = new Date(Date.now());
  const firestore = firebase.firestore();
  const eventRefs = firestore.collection("events");

  try {
    dispatch(asyncActionStart());
    let startAfter =
      lastEvent &&
      (await firestore
        .collection("events")
        .doc(lastEvent.id)
        .get());
    let query;

    lastEvent
      ? (query = eventRefs
          /*  .where("date", ">=", today) */
          .orderBy("date")
          .startAfter(startAfter)
          .limit(2))
      : (query = eventRefs
          /* .where("date", ">=", today) */
          .orderBy("date")
          .limit(2));

    let querySnap = await query.get();

    if (querySnap.docs.length === 0) {
      dispatch(asyncActionFinish());
      return;
    }

    let events = [];

    for (let i = 0; i < querySnap.docs.length; i++) {
      let evt = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id }; //this spreads out query snap data and adds the id of the querySnap as a field as an id field to the data
      events.push(evt);
    }
    dispatch({ type: FETCH_EVENTS, payload: { events } });
    dispatch(asyncActionFinish());
    return querySnap;
  } catch (error) {
    /*  */
    console.log(error);
    dispatch(asyncActionError());
  }
};

export const addEventComment = (eventId, values, parentId) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const profile = getState().firebase.profile;
  const user = firebase.auth().currentUser;

  let newComment = {
    parentId: parentId,
    displayName: profile.displayName,
    photoURL: profile.photoURL || "/assets/user.png",
    uid: user.uid,
    text: values.comment,
    date: Date.now()
  };

  try {
    console.log(eventId);
    console.log(newComment);
    await firebase.push(`event_chat/${eventId}`, newComment);
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "Problem adding comment");
  }
};
