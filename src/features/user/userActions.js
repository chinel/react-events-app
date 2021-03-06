import moment from "moment";
import { toastr } from "react-redux-toastr";
import cuid from "cuid";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart
} from "../async/asyncActions";

import firebase from "../../app/config/firebase";
import { FETCH_EVENTS } from "../event/eventConstants";

//Because we will be using firebase there will be no need
//To create constants and reducer as we will be using the one provided by firebase

export const updateProfile = user => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  //When updating the firestore user profile their are extra 2 fields that are added by default
  //We need to remove the fields so that they are not sent accross when a user updates his or her profile
  //We will be using the spread operator to remove this two fields
  const { isEmpty, isLoaded, ...updatedUser } = user; //this removes the isEmpty and isLoaded and spreads other fields into the updatedUser

  //this checks if the user submitted a date and if the date is different from the current state, which is used to check if the date of birth field has been changed and then format the date to a moment date
  if (updatedUser.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
    updatedUser.dateOfBirth = moment(updatedUser.dateOfBirth).toDate();
  }
  try {
    //this updateProfile is different from the one used in the authActions
    //this updates the firestore user profile and its from get firebase
    await firebase.updateProfile(updatedUser);
    toastr.success("Success", "Profile Updated");
  } catch (error) {
    console.log(error);
  }
};

export const uploadProfileImage = (file, filename) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const imageName = cuid();
  const user = firebase.auth().currentUser; //this is a synchronous function so you don't need to use await
  const path = `${user.uid}/user_images`; //this is the path where images will be stored in the firestore storage each user whill have a path which consist of the user;s uid and user_images
  const options = {
    name: imageName
  };
  try {
    dispatch(asyncActionStart());
    //step 1 - upload the file to firebase storage
    let uploadedFile = await firebase.uploadFile(path, file, null, options); //the third parameter is used if we want to save the image in firebase
    //step 2 - get the url of the image
    let downloadURL = await uploadedFile.uploadTaskSnapshot.downloadURL;
    //step 3 - get the user doc
    let userDoc = await firestore.get(`users/${user.uid}`);
    //step 4 - check if the user has photo, if not update the profile with new photo
    console.log(userDoc);
    ////console.log(userDoc.data());
    if (!userDoc.data().photoURL) {
      //the reason we are using the data function to retrieve the PhotoURL is because the userDoc returns a snapshot
      //Firebase update profile
      await firebase.updateProfile({
        photoURL: downloadURL
      });
      //Update authenticated user profile
      await user.updateProfile({
        photoURL: downloadURL
      });
    }

    //add the new photo to photo collections
    await firestore.add(
      {
        collection: "users",
        doc: user.uid,
        subcollections: [{ collection: "photos" }]
      },
      {
        name: imageName,
        url: downloadURL
      }
    );
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
    throw new Error("Problem uploading photos");
  }
};

export const deletePhoto = photo => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  //We will be deleting the image from both firebase and firestore
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;

  try {
    await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
    await firestore.delete({
      collection: "users",
      doc: user.uid,
      subcollections: [{ collection: "photos", doc: photo.id }]
    });
  } catch (error) {
    console.log(error);
    throw new Error("Problem deleting the photo");
  }
};

//here we didn't add the bracket around the photo parameter because it is really not necessary if it is just one parameter
export const setMainPhoto = photo => async (dispatch,getState) => {
  //BECAUSE THIS PROCESS WILL BE TAKING A LITTLE TIME WE WILL BE ADDING THE LOADING FLAG, using the dispatch async 
  dispatch(asyncActionStart())
  //const firebase = getFirebase(); we will be using batchWrites and so we will be needing to use firebase api directly
  const firestore = firebase.firestore();
  const user  = firebase.auth().currentUser;
  /* const today = new Date(Date.now()); */
  //Note you have to take into consideration the number of updates you want to perform at once as, updates has an impact on your quota and you have to be really sure it is neccessary before you can perform it
 
  let userDocRef =  firestore.collection('users').doc(user.uid);
  let eventAttendeeRef = firestore.collection('event_attendee');
  try {
    
    let batch =  firestore.batch();

    await batch.update(userDocRef,{
      photoURL: photo.url
    })

    let eventQuery = await eventAttendeeRef.where("userUid", '==',user.uid);
    //.where('eventDate', '>', today);//this gets event_attendee date is greater than today to save quota

    let eventQuerySnap = await eventQuery.get();
    for (let i = 0; i < eventQuerySnap.docs.length; i++) {
      let eventDocRef = await firestore
      .collection('events')
      .doc(eventQuerySnap.docs[i].data().eventId);
      let event = await eventDocRef.get();
      if (event.data().hostUid === user.uid) {
        batch.update(eventDocRef,{
          hostPhotoURL: photo.url,
          [`attendees.${user.uid}.photoURL`]:photo.url
        })
      } else {
        batch.update(eventDocRef,{
          [`attendees.${user.uid}.photoURL`]:photo.url
        })
      }
      
    }
    console.log(batch);
    await batch.commit();
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
    throw new Error("Problem setting main photo");
  }
};

export const goingToEvent = event => async (
  dispatch,
  getState,
  /* { getFirestore } */
) => {
  //here we will be using transactions to ensure data consistency
  //So that if this same doc is being updated by another using user via  another action, this will retry the transaction
  //to ensure that the data is consistent

  /* const firestore = getFirestore(); */
  //We will be using the asyncActionStart to get a loading flag to display to the user as transaction take more time than batch updates
  dispatch(asyncActionStart());
  const firestore = firebase.firestore();
  const user = firebase.auth().currentUser;
  const profile = getState().firebase.profile;
  const attendee = {
    going: true,
    joinDate: Date.now(),
    photoURL: profile.photoURL || "/assets/user.png",
    displayName: profile.displayName,
    host: false
  };

  try {
    let eventDocRef = firestore.collection('events').doc(event.id);
    let eventAttendeeEventDocRef = firestore.collection('event_attendee').doc(`${event.id}_${user.id}`);

    await firestore.runTransaction(async (transaction)=>{
      await transaction.get(eventDocRef);
      await transaction.update(eventDocRef,{
        [`attendees.${user.uid}`]: attendee
      });
      await transaction.set(eventAttendeeEventDocRef,{
        eventId: event.id,
        userUid: user.uid,
        eventDate: event.date,
        host: false
      });
    });

    
    dispatch(asyncActionFinish());
    toastr.success("Success", "You have signed up to the event");
  } catch (error) {
    console.log(error);
    dispatch(asyncActionFinish( ))
    toastr.error("Oops", "Problem siginig up to event");
  }
};

export const cancelGoingToEvent = event => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const user = firestore.auth().currentUser;

  try {
    await firestore.update(`events/${event.id}`, {
      [`attendees.${user.uid}`]: firestore.FieldValue.delete()
    });

    await firestore.delete(`event_attendee/${event.id}_${user.uid}`);
    toastr.success("Success", "You have removed yourself from the event");
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "Something went wrong");
  }
};

export const getUserEvents = (userUid, activeTab) => async (
  dispatch,
  getState
) => {
  dispatch(asyncActionStart());
  const firestore = firebase.firestore();
  const today = new Date(Date.now());
  let eventsRef = firestore.collection("event_attendee");
  let query;

  switch (activeTab) {
    case 1: // past events
      query = eventsRef
        .where("userUid", "==", userUid)
        .where("eventDate", "<=", today)
        .orderBy("eventDate", "desc");
      break;
    case 2: //future events
      query = eventsRef
        .where("userUid", "==", userUid)
        .where("eventDate", ">=", today)
        .orderBy("eventDate");
      break;
    case 3: // hosted events
      query = eventsRef
        .where("userUid", "==", userUid)
        .where("host", "==", true)
        .orderBy("eventDate", 'desc');
      break;
    default:
      query = eventsRef
      .where("userUid", "==", userUid)
      .orderBy("eventDate", 'desc');
      break;
  }
  try {
    let querySnap = await query.get();
    let events = [];

    for (let i = 0; i < querySnap.docs.length; i++) {
      let evt = await firestore.collection('events').doc(querySnap.docs[i].data().eventId).get();
      events.push({...evt.data(), id: evt.id});
      
    }

    //then we need to dipatch to the event reducer
    dispatch({type: FETCH_EVENTS,payload:{events}});

    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};


export const followUser = userToFollow => 
async(dispatch, getState, {getFirestore}) => {
  const firestore = getFirestore();
  const user = firestore.auth().currentUser;
  const following = {
    photoURL: userToFollow.photoURL || '/assets/user.png',
    city: userToFollow.city || 'Unknown City',
    displayName: userToFollow.displayName
  };

  try {
    await firestore.set({
      collection: 'users',
      doc: user.uid,
      subcollections: [{collection: "following", doc: userToFollow.id}]
    }, following);
  } catch (error) {
    console.log(error)
  }
}

export const unfollowUser = (userToUnfollow) =>
async(dispatch, getState,{getFirestore}) => {
  const firestore = getFirestore();
  const user = firestore.auth().currentUser;

  try {
   await firestore.delete({
     collection: "users",
     doc: user.uid,
     subcollections: [{collection: "following", doc: userToUnfollow.id}]
   })  
  } catch (error) {
    console.log(error);
  }
}

//Also note that the interest field that is saved to firestore user is saved as an array if you intend to make changes to specific fields in the array
//this will be impossible for now it always updates the entire array and also if you decide to ffind out users
//Who share the same interest this will be impossible as well in firestore as the field is stores as an array
//To be able to achieve this you have to save the fields as an object instead of an array
