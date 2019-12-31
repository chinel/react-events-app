import React, { Component } from "react";
import { Segment, Item, Icon, List, Button, Label } from "semantic-ui-react";
import format from "date-fns/format";
import EventListAttendee from "./EventListAttendee";
import { Link } from "react-router-dom";
import { objectToArray } from "../../../app/common/util/helpers";

class EventListItem extends Component {
  render() {
    const { event, deleteEvent } = this.props;
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={event.hostPhotoURL} />
              <Item.Content>
                <Item.Header as={Link} to={`/event/${event.id}`}>{event.title}</Item.Header>
                <Item.Description>
                  Hosted by <Link to={`/profile/${event.hostUid}`}>{event.hostedBy}</Link>
                </Item.Description>
                {event.cancelled &&
                <Label style={{top: '-40px'}} color="red" ribbon="right" content="This event has been cancelled"/>}
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" /> {format(event.date, "dddd Do MMMM")} at{" "}
            {format(event.date, "HH:mm")}|
            <Icon name="marker" /> {event.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {event.attendees && /*The object.values converts the object data to an array */
              objectToArray(event.attendees).map((attendee)=> (
                <EventListAttendee key={attendee.id} attendee={attendee} />
              ))}
          </List>
        </Segment>
        <Segment clearing>
          <span>{event.description.substr(0, 100)}...</span>
          {/* <Button
            as="a"
            color="red"
            floated="right"
            content="Delete"
            onClick={deleteEvent(event.id)}
          /> */}
          <Button
            as={Link}
            to={`/event/${event.id}`}
            color="teal"
            floated="right"
            content="View"
          />
        </Segment>
      </Segment.Group>
    );
  }
}

export default EventListItem;
