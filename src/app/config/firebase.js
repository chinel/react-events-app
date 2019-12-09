import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    /*Add your firebase config here */
}

firebase.initializeApp(firebaseConfig);
firebase.firestore();
const settings = {
    timestampsInSnapshots: true 
}  // you no longer need to explictly set this as it is there by default


export default firebase;