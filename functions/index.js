const functions = require("firebase-functions");
/*We need admin functionality to allow us to access the application without needing permission */
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const newActivity = (type, event, id) => {
  return {
    type: type,
    eventDate: event.date,
    hostedBy: event.hostedBy,
    title: event.title,
    photoURL: event.hostPhotoURL,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    hostUid: event.hostUid,
    eventId: id
  };
};

//OUR FIRST FUNCTION
//exports which we will be needing anytime we want to create a cloud function
//createActivity is the name of the function
exports.createActivity = functions.firestore
  .document("events/{eventId}")
  .onCreate(event => {
    let newEvent = event.data(); //this gives us access to the event document that is being created
    console.log(newEvent); // logging out in the console helps us diagnose if we have an error as cloud error reporting won;t let you know where the exact error is

    const activity = newActivity("newEvent", newEvent, event.id);

    console.log(activity);

    return admin
      .firestore()
      .collection("activity")
      .add(activity) //this will add the activity and create a random id
      .then(docRef => {
        // the javascript we will be using the create cloud functions does not give us access to async so we will be using then promise chain
        return console.log("Activity created with ID: ", docRef.id);
      })
      .catch(err => {
        return console.log("Error adding activity", err); // the error reporting for cloud function is not reliable so we have to make use of console.logs to always view whatever information at any point in time
      });
  });

exports.cancelActivity = functions.firestore
  .document("events/{eventId}")
  .onUpdate((event, context) => {
    let updatedEvent = event.after.data();
    let previousEventData = event.before.data();
    console.log({ event }); // surrounding a variable with curly bracket here on output shows the title of the variable then the value of the variable, it helps to easily locate the variable when you have other console.logs
    console.log({ context });
    console.log({ updatedEvent });
    console.log({ previousEventData });

    if (
      !updatedEvent.cancelled ||
      updatedEvent.cancelled === previousEventData.cancelled
    )
      return false;

    const activity = newActivity(
      "cancelledEvent",
      updatedEvent,
      context.params.eventId
    );
    console.log(activity);
    return admin
      .firestore()
      .collection("activity")
      .add(activity) //this will add the activity and create a random id
      .then(docRef => {
        // the javascript we will be using the create cloud functions does not give us access to async so we will be using then promise chain
        return console.log("Activity created with ID: ", docRef.id);
      })
      .catch(err => {
        return console.log("Error adding activity", err); // the error reporting for cloud function is not reliable so we have to make use of console.logs to always view whatever information at any point in time
      });
  });


  exports.userFollowing = functions.firestore.document('users/{followerUid}/following/{followingUid}').
  onCreate((event, context) => {
    console.log("v1");
    const followerUid = context.params.followerUid;
    const followingUid = context.params.followingUid;

    const followerDoc = admin
    .firestore()
    .collection('users')
    .doc(followerUid);

    console.log(followerDoc);

    return followerDoc.get().then(doc => {
     let userData = doc.data();
     console.log({userData});
     let follower = {
       displayName: userData.displayName,
       photoURL: userData.photoURL || '/assets/user.png',
       city: userData.city || 'Unknown City'
     };

    return admin.firestore()
    .collection('users')
    .doc(followingUid)
    .collection('followers')
    .doc(followerUid)
    .set(follower);
    }).catch(err => {
      return console.log("Error adding follower", err); 
    });
  })

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
/* exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
 }); */
