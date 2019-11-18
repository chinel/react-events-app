import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan } from 'revalidate'
import cuid from "cuid";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { createEvent, updateEvent } from "../eventActions";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  //WITH REDUX FORM YOU WON'T BE NEEDING TO CREATE FIELDS MANUALLY THIS ALREADY DONE AUTOMATICALLY
 /*  let event = {
    title: "",
    date: "",
    city: "",
    venue: "",
    hostedBy: ""
  }; */

  //WE JUST SET THE EVENT TO AN EMPTY OBJECT
  let event = {};

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }

  //WE WOULD NO LONGER BE NEEDING TO RETURN THE EVENT OBJECT 
 /*  return {
    event
  }; */


  //WITH REDUX FORM YOU CAN SET THE INITIAL VALUES AS SHOWN BELOW
  return {
    initialValues:event
  };


};

const actions = {
  createEvent,
  updateEvent
};

const category = [
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'},
];

const validate = combineValidators({
  title: isRequired({message: "The event title is required"}),
  category: isRequired({message: "Please select a catrgory"}),
  description: composeValidators(
    isRequired({message: "Please enter a description"}),
    hasLengthGreaterThan(4)({message: "Description has to be at least 5 characters"})
  )(),
  city: isRequired('city'),
  venue: isRequired('venue')
});

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

/*   onFormSubmit = evt => { thi was used when redux form was not implemented */
  onFormSubmit = values => {
   //this is no longer needed with redux forms evt.preventDefault();
   /*  if (this.state.event.id) {  instead of using check in the state we will be checking the event data in initializeValues of redux forms*/
    if (this.props.initialValues.id) {
      this.props.updateEvent(this.state.event);
      this.props.history.goBack();
    } else {
      const newEvent = {
       /*  ...this.state.event, we don;t need to get the value from the state rather we will get that from the values parameter passed  */
       ...values, 
       id: cuid(),
        hostPhotoURL: "/assets/user.png",
        hostedBy: "Bob"
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
    const {invalid, pristine, submitting} = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Event Details" />
            {/* <Form onSubmit={this.onFormSubmit}>  this was used when redux form was not implemented*/}
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}> {/*We will be using the handleSubmit method which was inherited from redux forms*/}
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
                options={category}
                component={SelectInput}
              />
              <Field
                type="text"
                name="description"
                placeholder="Tell us about your event"
                rows={3}
                component={TextArea}
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

              <Button disabled={invalid || submitting || pristine} positive type="submit">
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
)(reduxForm({ form: "eventForm", enableReinitialize: true, validate })(EventForm));
