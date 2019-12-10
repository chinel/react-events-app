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

    export const uploadProfileImage = (file, filename) => 
        async (dispatch, getState,{getFirebase, getFirestore}) => {
            const firebase = getFirebase();
            const firestore = getFirestore();
            const user = firebase.auth().currentUser; //this is a synchronous function so you don't need to use await
            const path = `${user.uid}/user_images`; //this is the path where images will be stored in the firestore storage each user whill have a path which consist of the user;s uid and user_images
            const options = {
                name: filename
            };
            try {
                //step 1 - upload the file to firebase storage
                let uploadedFile = await firebase.uploadFile(path, file, null,options); //the third parameter is used if we want to save the image in firebase 
                //step 2 - get the url of the image
                let downloadURL =  await uploadedFile.uploadTaskSnapshot.downloadURL;
                //step 3 - get the user doc
                let userDoc =  await firestore.get(`users/${user.uid}`);
                //step 4 - check if the user has photo, if not update the profile with new photo
                console.log(userDoc);
                ////console.log(userDoc.data());
                if(!userDoc.data().photoURL){//the reason we are using the data function to retrieve the PhotoURL is because the userDoc returns a snapshot
                 //Firebase update profile
                  await firebase.updateProfile({
                      photoURL: downloadURL
                  });
                  //Update authenticated user profile
                  await user.updateProfile({
                      photoURL: downloadURL
                  })

                }
                  
                //add the new photo to photo collections
                return await firestore.add({
                    collection: 'users',
                    doc: user.uid,
                    subcollections: [{collection: 'photos'}]
                },{
                    name: filename,
                    url: downloadURL
                })
            } catch (error) {
                console.log(error);
                throw new Error('Problem uploading photos');
            } 


        }


  //Also note that the interest field that is saved to firestore user is saved as an array if you intend to make changes to specific fields in the array
  //this will be impossible for now it always updates the entire array and also if you decide to ffind out users
  //Who share the same interest this will be impossible as well in firestore as the field is stores as an array
  //To be able to achieve this you have to save the fields as an object instead of an array  
