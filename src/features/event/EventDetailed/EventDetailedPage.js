import React, { Component } from 'react'
import {  connect} from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { Grid } from "semantic-ui-react";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";
import { toastr } from 'react-redux-toastr';


const mapState = (state, ownProps) => { //Here ownProps is the props already available to the component such as the history, match, location object if routing is applied and so on and so forth
   const eventId = ownProps.match.params.id;

   let event = {};

   if(eventId && state.events.length > 0){
       event = state.events.filter(event => event.id === eventId)[0];
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
    return (
      <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader  event={event}/>
        <EventDetailedInfo event={event} />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar attendees={event.attendees}/>
      </Grid.Column>
    </Grid>
    )
  }
}



//the withFirestore Higher order component provides us with firebase and firestore methods that we can use to do a whole lot
export default withFirestore(connect(mapState)(EventDetailedPage));
