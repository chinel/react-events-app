import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import cuid from "cuid";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { createEvent, updateEvent } from "../eventActions";
import TextInput from "../../../app/common/form/TextInput";

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

const actions = {
  createEvent,
  updateEvent
};

class EventForm extends Component {
 /*  state = {
    event: Object.assign({}, this.props.event)
  }; */

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
      this.props.history.goBack();
    } else {
      const newEvent = {
        ...this.state.event,
        id: cuid(),
        hostPhotoURL: "/assets/user.png"
      };
      this.props.createEvent(newEvent);
      this.props.history.push("/events");
    }
  };

  /*   onInputChange = evt => {
    const newEvent = this.state.event;
    newEvent[evt.target.name] = evt.target.value;

    this.setState({
      event: newEvent
    });
  }; */
  render() {
    /*     const { event } = this.state; */
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Event Details" />
            <Form onSubmit={this.onFormSubmit}>
              <Field
                type="text"
                name="title"
                placeholder="Give your event name"
                component={TextInput}
              />
              <Field
                type="text"
                name="category"
                placeholder="What is your event about"
                component={TextInput}
              />
              <Field
                type="text"
                name="description"
                placeholder="Tell us about your event"
                component={TextInput}
              />
              <Header sub color="teal" content="Event Location Details" />
              <Field
                type="text"
                name="city"
                placeholder="Event City"
                component={TextInput}
              />
              <Field
                type="text"
                name="venue"
                placeholder="Event Venue"
                component={TextInput}
              />
              <Field
                type="text"
                name="date"
                placeholder="Event Date"
                component={TextInput}
              />
              {/*  <Form.Field>
            <label>Event Title</label>
            <input
              value={event.title}
              name="title"
              placeholder="Event Title"
              onChange={this.onInputChange}
            />
          </Form.Field> */}

              <Button positive type="submit">
                Submit
              </Button>
              <Button onClick={this.props.history.goBack} type="button">
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapState,
  actions
)(reduxForm({ form: "eventForm" })(EventForm));
