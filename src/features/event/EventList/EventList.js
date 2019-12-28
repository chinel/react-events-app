import React, { Component } from "react";
import EventListItem from "./EventListItem";
import InfiniteScroll from "react-infinite-scroller";

class EventList extends Component {
  render() {
    const { events, deleteEvent, getNextEvent, loading, moreEvents } = this.props;
    return (
      <div>
        {events && events.length !== 0 && (
          <InfiniteScroll
          pageStart={0}
          loadMore={getNextEvent}
          hasMore={!loading && moreEvents}
          initialLoad={false}
          >
            {events &&
              events.map((
                event //because we are pulling the events from firestore we had to check if the event exist first before using it as the data seems to be loaded aftere the component has been loaded
              ) => (
                <EventListItem
                  key={event.id}
                  event={event}
                  deleteEvent={deleteEvent}
                />
              ))}
          </InfiniteScroll>
        )}
      </div>
    );
  }
}

export default EventList;
