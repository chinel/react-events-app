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

export const signOutUser = () => {
  return {
    type: SIGN_OUT_USER
  };
};
