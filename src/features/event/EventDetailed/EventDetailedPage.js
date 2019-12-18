import React, { Component } from 'react'
import {  connect} from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { Grid } from "semantic-ui-react";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";
import { toastr } from 'react-redux-toastr';
import { objectToArray } from '../../../app/common/util/helpers';
import {  goingToEvent } from '../../user/userActions';


const mapState = (state,/*  ownProps */) => { //Here ownProps is the props already available to the component such as the history, match, location object if routing is applied and so on and so forth
   //const eventId = ownProps.match.params.id;   we would no longer be needing to use the match inside of here as it is used in the componentDidMount react lifecycle method already

   let event = {};

   if(state.firestore.ordered.events && state.firestore.ordered.events[0]){
       //event = state.events.filter(event => event.id === eventId)[0];
       event = state.firestore.ordered.events[0];
   }

   return{
       event,
       auth: state.firebase.auth
   }

}

const actions = {
  goingToEvent
}


class EventDetailedPage extends Component {

 async componentDidMount(){
   const {firestore, match /* history */} = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  /*  console.log(event);
   if(!event.exists){
    history.push('/events');
    toastr.error("Sorry", "Event Not Found");
   } */

  }

   async componentWillMount (){
    const {firestore, match /* history */} = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }


  render() {
    const {event, auth, goingToEvent} = this.props;
    const attendees = event && event.attendees && objectToArray(event.attendees);//this check to see if there are events and if there are also attendees under the events then it uses the objectToArray helper method to convert it to an array
    const isHost = event.hostUid === auth.uid;
    const isGoing = attendees && attendees.some(a => a.id === auth.uid); //this check to see if attendees is present and if attendees has an id matching auth id it returns true or false    return (
     return(
     <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader  event={event} isHost={isHost} isGoing={isGoing} goingToEvent={goingToEvent}/>
        <EventDetailedInfo event={event} />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar attendees={attendees}/>
      </Grid.Column>
    </Grid>
    )
  }
}



//the withFirestore Higher order component provides us with firebase and firestore methods that we can use to do a whole lot
export default withFirestore(connect(mapState, actions)(EventDetailedPage));
