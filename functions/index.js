const functions = require("firebase-functions");
/*We need admin functionality to allow us to access the application without needing permission */
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

//OUR FIRST FUNCTION
//exports which we will be needing anytime we want to create a cloud function
//createActivity is the name of the function
exports.createActivity = functions.firestore
  .document("events/{eventId}")
  .onCreate(event => {
    let newEvent = event.data(); //this gives us access to the event document that is being created
    console.log(newEvent); // logging out in the console helps us diagnose if we have an error as cloud error reporting won;t let you know where the exact error is

    const activity = {
        type: 'newEvent',
        eventDate: newEvent.date,
        hostedBy: newEvent.hostedBy,
        title: newEvent.title,
        photoURL: newEvent.hostPhotoURL,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        hostUid: newEvent.hostUid,
        eventId: event.id
    }

    console.log(activity);

    return admin.firestore().collection('activity')
    .add(activity)//this will add the activity and create a random id
    .then(docRef => {// the javascript we will be using the create cloud functions does not give us access to async so we will be using then promise chain
        return console.log("Activity created with ID: ", docRef.id);
    }).catch(err => {
        return console.log('Error adding activity', err);// the error reporting for cloud function is not reliable so we have to make use of console.logs to always view whatever information at any point in time
    })
});




// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
/* exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
 }); */
