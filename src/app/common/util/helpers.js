import moment from 'moment';


//This function helps us to convert our object to an array and adds the key of the object to the array so as to use it as an id
export const objectToArray = (object) => {
if(object){
    return Object.entries(object).map(e => Object.assign(e[1],{id: e[0]}));
}
}


export const createNewEvent = (user, photoURL, event) => {
    //first we have to convert the event date from a moment object to a normal date
   event.date = moment(event.date).toDate();
   //here we use the spread operator to spread the event and some other fields to the event data
   return {
     ...event,
     hostUid: user.uid,
     hostedBy: user.displayName,
     hostPhotoURL: photoURL || "/assets/user.png",
     created: Date.now(),
     attendees: {
         [user.uid]: {
             going: true,
             joinDate: Date.now(),
             photoURL: photoURL || "/assets/user.png",
             displayName: user.displayName,
             host: true
         }
     }
   }
}