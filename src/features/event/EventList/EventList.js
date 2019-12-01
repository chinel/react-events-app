import React, { Component } from "react";
import EventListItem from "./EventListItem";

class EventList extends Component {
  render() {
    const { events,deleteEvent } = this.props;
    return (
      <div>
        {events && events.map((event) => ( //because we are pulling the events from firestore we had to check if the event exist first before using it as the data seems to be loaded aftere the component has been loaded
          <EventListItem key={event.id} event={event}  deleteEvent={deleteEvent}/>
        ))}
      </div>
    );
  }
}

export default EventList;
