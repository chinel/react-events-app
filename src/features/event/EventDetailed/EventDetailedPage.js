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


const mapState = (state,/*  ownProps */) => { //Here ownProps is the props already available to the component such as the history, match, location object if routing is applied and so on and so forth
   //const eventId = ownProps.match.params.id;   we would no longer be needing to use the match inside of here as it is used in the componentDidMount react lifecycle method already

   let event = {};

   if(state.firestore.ordered.events && state.firestore.ordered.events[0]){
       //event = state.events.filter(event => event.id === eventId)[0];
       event = state.firestore.ordered.events[0];
   }

   return{
       event
   }

}


class EventDetailedPage extends Component {

 async componentDidMount(){
   const {firestore, match, history} = this.props;
   let event = await firestore.get(`events/${match.params.id}`);
   console.log(event);
   if(!event.exists){
    history.push('/events');
    toastr.error("Sorry", "Event Not Found");
   }

  }


  render() {
    const {event} = this.props;
    const attendees = event && event.attendees && objectToArray(event.attendees);//this check to see if there are events and if there are also attendees under the events then it uses the objectToArray helper method to convert it to an array
    return (
      <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader  event={event}/>
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
export default withFirestore(connect(mapState)(EventDetailedPage));
