import React from "react";
import {  connect} from 'react-redux';
import { Grid } from "semantic-ui-react";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";


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
const EventDetailedPage = ({event}) => {
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
  );
};

export default connect(mapState)(EventDetailedPage);
