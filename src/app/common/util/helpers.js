import moment from 'moment';


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