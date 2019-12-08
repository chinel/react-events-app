import moment from "moment";
import { toastr } from 'react-redux-toastr'

//Because we will be using firebase there will be no need
//To create constants and reducer as we will be using the one provided by firebase

export const updateProfile = user => 
    async(dispatch, getState, {getFirebase}) => {
         const firebase = getFirebase();
         //When updating the firestore user profile their are extra 2 fields that are added by default 
         //We need to remove the fields so that they are not sent accross when a user updates his or her profile
         //We will be using the spread operator to remove this two fields
         const {isEmpty, isLoaded, ...updatedUser} = user; //this removes the isEmpty and isLoaded and spreads other fields into the updatedUser

        //this checks if the user submitted a date and if the date is different from the current state, which is used to check if the date of birth field has been changed and then format the date to a moment date
        if(updatedUser.dateOfBirth !== getState().firebase.profile.dateOfBirth){
            updatedUser.dateOfBirth =  moment(updatedUser.dateOfBirth).toDate();
        }
        try {
            //this updateProfile is different from the one used in the authActions
            //this updates the firestore user profile and its from get firebase
            await firebase.updateProfile(updatedUser);
            toastr.success('Success','Profile Updated');
        } catch (error) {
            console.log(error);
        }
    }
