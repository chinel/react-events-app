import React, { Component } from 'react'
import EventListItem from './EventListItem'

class EventList extends Component {
    render() {
        return (
            <div>
                <EventListItem/>
                <EventListItem/>
                <EventListItem/>
            </div>
        )
    }
}


export default EventList