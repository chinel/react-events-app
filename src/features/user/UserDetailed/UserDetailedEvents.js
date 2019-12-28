import React from "react";
import { Grid, Segment, Menu, Card, Image, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import format from "date-fns/format";

const UserDetailedEvents = ({ events, eventsLoading }) => {
  return (
    <Grid.Column width={12}>
      <Segment attached loading={eventsLoading}>
        <Header icon="calendar" content="Events" />
        <Menu secondary pointing>
          <Menu.Item name="All Events" active />
          <Menu.Item name="Past Events" />
          <Menu.Item name="Future Events" />
          <Menu.Item name="Events Hosted" />
        </Menu>

        <Card.Group itemsPerRow={5}>
          
          {events &&
            events.map(event => (
              <Card as={Link} to={`/event/${event.id}`} key={event.id}>
                <Image src={`/assets/categoryImages/${event.category}.jpg`} />
                <Card.Content>
                  <Card.Header textAlign="center">{event.title.substr(0,5)}..</Card.Header>
                  <Card.Meta textAlign="center">
                    <div>{format(event.date, "DD MMM YYYY")}</div>
                    <div>{format(event.date, "h:mm A")}</div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
        </Card.Group>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedEvents;
