import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import EventList from "../EventList/EventList";
import { connect } from "react-redux";
import {deleteEvent } from "../eventActions";
import LoadingComponent from '../../../app/layout/LoadingComponent';

const mapState = state => ({
  events: state.events,
  loading: state.async.loading
});

const actions = {
 /*  createEvent,
  updateEvent, */
  deleteEvent
};

class EventDashboard extends Component {
 /*  state = {
    //events: eventsFromDashboard,
    isOpen: false,
    selectedEvent: null
  }; */

/*   handleFormOpen = () => {
    this.setState({
      selectedEvent: null,
      isOpen: true
    });
  };

  handleFormCancel = () => {
    this.setState({
      isOpen: false
    });
  }; */

/*   handleUpdateEvent = updatedEvent => {
    this.props.updateEvent(updatedEvent);
    this.setState({
       events: this.state.events.map(event => {
        if (event.id === updatedEvent.id) {
          return Object.assign({}, updatedEvent);
        } else {
          return event;
        }
      }), 
      isOpen: false,
      selectedEvent: null
    });
  }; */

/*   handleOpenEvent = EventToOpen => () => {
    this.setState({
      selectedEvent: EventToOpen,
      isOpen: true
    });
  }; */
  
 /*  handleCreateEvent = newEvent => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = "/assets/user.png";
    this.props.createEvent(newEvent);
   // const updatedEvent = [...this.state.events, newEvent]; //spread operator takes the current data inside of the array, spreads it out and then add the second parameter which is a new data to the end
    this.setState({
     // events: updatedEvent,
     isOpen: false
    });
  }; */

  handleDeleteEvent = eventId => () => {
    console.log("An here");
    this.props.deleteEvent(eventId);
  /*   const UpdatedEvents = this.state.events.filter(e => e.id !== eventId);
    console.log(UpdatedEvents);
    this.setState({
      events: UpdatedEvents
    }); */
  };

  render() {
    const  {events, loading} = this.props;
    if (loading) return <LoadingComponent inverted={true}/> /*Setting the inverted property to true changes the default dark overlay to a white one*/
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            deleteEvent={this.handleDeleteEvent}
            events={/* this.state. */events}
          />
        </Grid.Column>
        <Grid.Column width={6}>
         
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapState,
  actions
)(EventDashboard);
