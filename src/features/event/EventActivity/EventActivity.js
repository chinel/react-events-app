import React from 'react'
import { Header, Segment, Feed, Sticky } from 'semantic-ui-react';
import EventActivityItem from './EventActivityItem';

const EventActivity = ({activities, contextRef}) => {
    return (
        <Sticky context={contextRef} offset={100}> {/*the context is set to the contextRef props passed from event dashboard which is a div */}
            <Header attached="top" content="Recent Activity"/> 
            <Segment attached>
                <Feed>
                    {activities && activities.map(activity => (
                        <EventActivityItem key={activity.id} activity={activity}/>
                    ))}
                </Feed>
            </Segment>
        </Sticky>
    )
}

export default EventActivity
