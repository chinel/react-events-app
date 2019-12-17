/*global google*/
//this global declaration up is called a a global namespace variables that are addded here that are not seen by the component
import React, { Component } from "react";
import Script from "react-load-script";
import { connect } from "react-redux";
import { withFirestore } from 'react-redux-firebase';
import { reduxForm, Field } from "redux-form";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from "revalidate";
import cuid from "cuid";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { createEvent, updateEvent, cancelToggle } from "../eventActions";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";
import moment from "moment";
import PlacesInput from "../../../app/common/form/PlacesInput";
import { appConfig } from "../../../app/config/config";

const mapState = (state/* , ownProps */) => {
  //const eventId = ownProps.match.params.id;

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

 /*  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  } */

  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0];
  }

  //WE WOULD NO LONGER BE NEEDING TO RETURN THE EVENT OBJECT
  /*  return {
    event
  }; */

  //WITH REDUX FORM YOU CAN SET THE INITIAL VALUES AS SHOWN BELOW
  return {
    initialValues: event,
    event //this is the same as saying event:event
  };
};

const actions = {
  createEvent,
  updateEvent,
  cancelToggle
};

const category = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" }
];

const validate = combineValidators({
  title: isRequired({ message: "The event title is required" }),
  category: isRequired({ message: "Please select a catrgory" }),
  description: composeValidators(
    isRequired({ message: "Please enter a description" }),
    hasLengthGreaterThan(4)({
      message: "Description has to be at least 5 characters"
    })
  )(),
  city: isRequired("city"),//this is the default if you don;t want to specify your custom message
  venue: isRequired("venue"),
  date: isRequired("date")
});

class EventForm extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false
  };

  handleScriptLoaded = () => {
    this.setState({ scriptLoaded: true });
  };

  handleCitySelect = selectedCity => {
    geocodeByAddress(
      selectedCity
    ) /* This returns a promise so we can need to use then to get the results */
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          cityLatLng: latlng
        });
      }).then(() => {
        this.props.change('city',selectedCity)
      }); //adding this last then is used to handle onMouseSelect because when you type and click on an option it does not work this helps to correct that because assigning this function to the onselect overrode the default
  };


  handleVenueSelect = selectedVenue => {
    geocodeByAddress(
      selectedVenue
    ) /* This returns a promise so we can need to use then to get the results */
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          venueLatLng: latlng
        });
      }).then(() => {
        this.props.change('venue',selectedVenue)
      }); //adding this last then is used to handle onMouseSelect because when you type and click on an option it does not work this helps to correct that because assigning this function to the onselect overrode the default
  };


   async componentDidMount(){
   const {firestore, match}  = this.props;
    await firestore.setListener(`events/${match.params.id}`);
   //because we where storing our venueLatLng in our local state and when you
   //try updating an event and since you are not changing the location which triggers
   //and sets the venueLatLng and since the local state is empty
   //it sets the venueLatLng to what is in the state which is empty according to the onFormSubmit method
   /* This will be moved to the onFormSubmit method if(event.exists){
     this.setState({
       venueLatLng: event.data().venueLatLng
     })
   } */
  }

     async componentWillUnmount(){
   const {firestore, match}  = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
     }


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
    //values.date = moment(values.date).format();
    values.venueLatLng = this.state.venueLatLng;
    if (this.props.initialValues.id) {
      if(Object.keys(values.venueLatLng).length === 0){
        values.venueLatLng = this.props.event.venueLatLng;
      }
      this.props.updateEvent(values);
      this.props.history.goBack();
    } else {
      this.props.createEvent(values);
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
    const { invalid, pristine, submitting, event, cancelToggle } = this.props;
    return (
      <Grid>
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${appConfig.googleMapApiKey}&libraries=places`}
          onLoad={this.handleScriptLoaded}
        />
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Event Details" />
            {/* <Form onSubmit={this.onFormSubmit}>  this was used when redux form was not implemented*/}
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              {" "}
              {/*We will be using the handleSubmit method which was inherited from redux forms*/}
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
                  component={PlacesInput}
                  options={{
                    types: [
                      "(cities)"
                    ] /*this narrows the search down to cities*/
                  }}
                  onSelect={this.handleCitySelect}
                />
              
              {this.state.scriptLoaded && (
              <Field
                type="text"
                name="venue"
                placeholder="Event Venue"
                options={{
                  location: new google.maps.LatLng(this.state.cityLatLng),
                  radius: 1000,
                  types: [
                    "establishment"
                  ] /*this narrows the search down to businesss, the location key narrows it down to businesses within the selected location above*/
                }}
                component={PlacesInput}
                onSelect={this.handleVenueSelect}
              />)}
              <Field
                type="text"
                name="date"
                placeholder="Date and Time of Event"
                component={DateInput}
                showTimeSelect //the showTimeSelect allows us to add time select option
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                /*  dateFormat="YYYY/MM/DD HH:mm"  this date format throws a lot of warning errors in the console use the format beloe */
                dateFormat="YYYY-MM-DD HH:mm"
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
              <Button
                disabled={invalid || submitting || pristine}
                positive
                type="submit"
              >
                Submit
              </Button>
              <Button onClick={this.props.history.goBack} type="button">
                Cancel
              </Button>
              <Button
              onClick={() => cancelToggle(!event.cancelled, event.id)} /*The ! not operator will return the opposite of whatever event.cancelled is */
              type="button"
              color={event.cancelled ? 'green': 'red'}
              floated="right"
              content={event.cancelled ? 'Reactivate Event' : 'Cancel Event'}
              />
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withFirestore(connect(
  mapState,
  actions
)(
  reduxForm({ form: "eventForm", enableReinitialize: true, validate })(
    EventForm
  )
));

//here enabling reinitialize to true is used when the form will be used as an edit form or needs to have an initial value set, this makes the value available immediately after the page is refreshed
