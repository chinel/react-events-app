import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB2TIUe9_mOC525BlWpOnXp1WOG5mDIuWA",
    authDomain: "revents-53fed.firebaseapp.com",
    databaseURL: "https://revents-53fed.firebaseio.com",
    projectId: "revents-53fed",
    storageBucket: "revents-53fed.appspot.com",
    messagingSenderId: "141473127856",
    appId: "1:141473127856:web:407c969683c1f4b10dca75",
    measurementId: "G-Z2BX2E433Q"
}

firebase.initializeApp(firebaseConfig);
firebase.firestore();
const settings = {
    timestampsInSnapshots: true 
}  // you no longer need to explictly set this as it is there by default


export default firebase;