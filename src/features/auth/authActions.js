import { LOGIN_USER, SIGN_OUT_USER } from "./authConstants";
import {SubmissionError} from 'redux-form';
import { closeModal } from "../modals/modalActions";

/* export const login = creds => {
  return dispatch => {
    dispatch({ type: LOGIN_USER, payload: { creds } });
    dispatch(closeModal());
  };
}; */

//Firebase version
export const login = creds => {
  return async (dispatch, getState, {getFirebase}) => {
    const firebase =  getFirebase();
    try {
      console.log(creds);
      await firebase.auth().signInWithEmailAndPassword(creds.email, creds.password);
      dispatch(closeModal());
    } catch (error) {
      console.log(error);
       throw new SubmissionError({
         /*_error: error.message // you might not want to show the user the exact login error messages from firebase, probably for security reasons, then you can change it to just display a text of string as shown below*/
         _error: "Login Failed"
       })
    }
    
  };
};

//We would no longer be needing the manual log out we would be using the logout from firebase
/* export const signOutUser = () => {
  return {
    type: SIGN_OUT_USER
  };
}; */

//We don;t neccessarily have to put curly braces, if we leave this out it means we want to return something
export const registerUser = (user) =>
  async (getState,dispatch,{getFirebase, getFirestore}) =>{
     const firebase = getFirebase();
     const firestore = getFirestore();

     try {
       //create the user in firebase auth
       let createdUser = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
       //update the auth profile as we can do that while creating a firebase auth profile
        await createdUser.updateProfile({
          displayName: user.displayName
        });
       //create a new profile in firestore
         let newUser = {
           displayName: user.displayName,
           createdAt: firestore.FieldValue.serverTimestamp()//here we are using firestore's timestamp
         }

         //to create a new document in a collection we can either use the add or set method of firestore
         //the add will automatically generate an id while the set allows you to set your own id
         //we will be using the set method and using the uid from the firebase auth profile created
         await firestore.set(`users/${createdUser.uid}`, {...newUser})
         dispatch(closeModal());

         //Is a lot cleaner to use the async await


     } catch (error) {
       //Firebase by default does not support duplicate registration, if user exist it throws an error
       console.log(error);
       throw new SubmissionError({
        _error: error.message 
       
      })
     }
  }

  export const socialLogin = (selectedProvider) => 
    async (dispatch, getState, {getFirebase}) => {

      const firebase = getFirebase();
      try {
         dispatch(closeModal());
         await firebase.login({
           provider: selectedProvider,
           type: 'popup'
         })
      } catch (error) {
        console.log(error)
      }         
    }
