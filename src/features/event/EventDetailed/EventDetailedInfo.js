import React, { Component } from "react";
import { Segment, Grid, Icon, Button } from "semantic-ui-react";

class EventDetailedInfo extends Component {
  state = {
    showMap: false
  };

  showMapToggle = () => {
    this.setState(prevState => ({
      // the prevState paramter is used to get the prevState, because whatever we will be changing relies on what the prevState was this probably used to toggle the state value to true or false
      showMap: !prevState.showMap
    }));
  };

  render() {
    const { event } = this.props;
    return (
      <Segment.Group>
        <Segment attached="top">
          <Grid>
            <Grid.Column width={1}>
              <Icon size="large" color="teal" name="info" />
            </Grid.Column>
            <Grid.Column width={15}>
              <p>{event.description}</p>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name="calendar" size="large" color="teal" />
            </Grid.Column>
            <Grid.Column width={15}>
              <span>{event.date}</span>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name="marker" size="large" color="teal" />
            </Grid.Column>
            <Grid.Column width={11}>
              <span>{event.venue}</span>
            </Grid.Column>
            <Grid.Column width={4}>
              <Button color="teal" size="tiny" content="Show Map" />
            </Grid.Column>
          </Grid>
        </Segment>
      </Segment.Group>
    );
  }
}

export default EventDetailedInfo;
