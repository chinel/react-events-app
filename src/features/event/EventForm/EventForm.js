import React, { Component } from "react";
import { connect } from "react-redux";
import { Segment, Form, Button } from "semantic-ui-react";

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {
    title: "",
    date: "",
    city: "",
    venue: "",
    hostedBy: ""
  };

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return {
    event
  };
};

class EventForm extends Component {
  state = {
    event: Object.assign({}, this.props.event)
  };

  //WE WILL NO LONGER BE NEEDING THE LIFECYCLE METHOD AS THE EVENTS ARE COMING FROM THE STORE THIS TIME AROUND

  /*   componentDidMount() {
    if (this.props.selectedEvent) {
      this.setState({
        event: this.props.selectedEvent
      });
    }
  } */

  /*  componentWillReceiveProps(nextprop) {
    if (nextprop.selectedEvent !== this.props.selectedEvent) {
      this.setState({
        event: nextprop.selectedEvent || EmptyEvent // this sets the state to the nextprops if present else fallbacks to the empty Event, it works like a tenary operator
      });
    }
  } */

  onFormSubmit = evt => {
    evt.preventDefault();
    if (this.state.event.id) {
      this.props.updateEvent(this.state.event);
    } else {
      this.props.createEvent(this.state.event);
    }
  };

  onInputChange = evt => {
    const newEvent = this.state.event;
    newEvent[evt.target.name] = evt.target.value;

    this.setState({
      event: newEvent
    });
  };
  render() {
    const { handleFormCancel } = this.props;
    const { event } = this.state;
    return (
      <Segment>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Field>
            <label>Event Title</label>
            <input
              value={event.title}
              name="title"
              placeholder="Event Title"
              onChange={this.onInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input
              value={event.date}
              name="date"
              type="date"
              placeholder="Event Date"
              onChange={this.onInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input
              value={event.city}
              name="city"
              placeholder="City event is taking place"
              onChange={this.onInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input
              value={event.venue}
              name="venue"
              placeholder="Enter the Venue of the event"
              onChange={this.onInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input
              value={event.hostedBy}
              name="hostedBy"
              placeholder="Enter the name of person hosting"
              onChange={this.onInputChange}
            />
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
          <Button onClick={handleFormCancel} type="button">
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default connect(mapState)(EventForm);
