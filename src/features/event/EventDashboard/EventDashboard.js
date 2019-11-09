import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import EventList from "../EventList/EventList";
import EventForm from "../EventForm/EventForm";
import cuid from 'cuid';



class EventDashboard extends Component {
  state = {
    events: eventsFromDashboard,
    isOpen: false,
    selectedEvent: null
  };

  handleFormOpen = () => {
    this.setState({
      selectedEvent: null,
      isOpen: true
    });
  };

  handleFormCancel = () => {
    this.setState({
      isOpen: false
    });
  };


  handleUpdateEvent = (updatedEvent) => {
   this.setState({
     events: this.state.events.map(event  => {
       if(event.id === updatedEvent.id){
         return Object.assign({}, updatedEvent)
       }else{
         return event;
       }
     }),
     isOpen: false,
     selectedEvent: null
   })
  }


  handleOpenEvent = (EventToOpen) => () => {
   this.setState({
     selectedEvent: EventToOpen,
     isOpen: true
   })
  }
  handleCreateEvent = (newEvent) => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = "/assets/user.png";
    const updatedEvent = [...this.state.events, newEvent]; //spread operator takes the current data inside of the array, spreads it out and then add the second parameter which is a new data to the end
    this.setState({
      events: updatedEvent
    })
  }

  handleDeleteEvent = (eventId) => () => {
    console.log("An here");
  const UpdatedEvents = this.state.events.filter(e => e.id !== eventId);
  console.log(UpdatedEvents);
  this.setState({
    events: UpdatedEvents
  });
  }

  render() {
    const {selectedEvent} = this.state;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList deleteEvent={this.handleDeleteEvent} onEventOpen={this.handleOpenEvent} events={this.state.events} />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            onClick={this.handleFormOpen}
            positive
            content="Create Event"
          />
          {this.state.isOpen && (
            <EventForm updateEvent={this.handleUpdateEvent} selectedEvent={selectedEvent} handleFormCancel={this.handleFormCancel} createEvent = {this.handleCreateEvent} />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

export default EventDashboard;
