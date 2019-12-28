import React, { Component } from "react";
import { Grid , Button} from "semantic-ui-react";
import { firestoreConnect, isLoaded, isEmpty} from 'react-redux-firebase';
import EventList from "../EventList/EventList";
import { connect } from "react-redux";
import {/* deleteEvent, */ getEventsForDashboard } from "../eventActions";
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventActivity from "../EventActivity/EventActivity";

const mapState = state => ({
  events: state.events,
  loading: state.async.loading
/*   events: state.firestore.ordered.events,
 */  /* loading: state.async.loading, */
});

const actions = {
 /*  createEvent,
  updateEvent, */
 /*  deleteEvent, */
  getEventsForDashboard
};

class EventDashboard extends Component {

  state = {
    moreEvents:false,
    loadingInitial: true,
    loadedEvents: []
  }

  async componentDidMount(){
   let next = await this.props.getEventsForDashboard();
   console.log(next);

   if(next && next.docs && next.docs.length > 1){
     this.setState({
       moreEvents: true,
       loadingInitial: false
     })
   }
  }

  componentWillReceiveProps(nextProps){
  if(this.props.events !== nextProps.events){
    this.setState({
      loadedEvents: [...this.state.loadedEvents, ...nextProps.events]
    })
  }
  }

  getNextEvent = async() => {
    const {events} = this.props;
    let lastEvent =  events && events[events.length-1];
    console.log(lastEvent);
    let next = await this.props.getEventsForDashboard(lastEvent);
    console.log(next);
    console.log(next && next.docs && next.docs.length <= 1);
    if(!next){
      this.setState({
        moreEvents: false
      })
    }
  }
 /*  state = {
    //events: eventsFromDashboard,
    isOpen: false,
    selectedEvent: null
  }; */

/*   handleFormOpen = () => {
    this.setState({
      selectedEvent: null,
      isOpen: true
    });
  };

  handleFormCancel = () => {
    this.setState({
      isOpen: false
    });
  }; */

/*   handleUpdateEvent = updatedEvent => {
    this.props.updateEvent(updatedEvent);
    this.setState({
       events: this.state.events.map(event => {
        if (event.id === updatedEvent.id) {
          return Object.assign({}, updatedEvent);
        } else {
          return event;
        }
      }), 
      isOpen: false,
      selectedEvent: null
    });
  }; */

/*   handleOpenEvent = EventToOpen => () => {
    this.setState({
      selectedEvent: EventToOpen,
      isOpen: true
    });
  }; */
  
 /*  handleCreateEvent = newEvent => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = "/assets/user.png";
    this.props.createEvent(newEvent);
   // const updatedEvent = [...this.state.events, newEvent]; //spread operator takes the current data inside of the array, spreads it out and then add the second parameter which is a new data to the end
    this.setState({
     // events: updatedEvent,
     isOpen: false
    });
  }; */

  handleDeleteEvent = eventId => () => {
    console.log("An here");
    this.props.deleteEvent(eventId);
  /*   const UpdatedEvents = this.state.events.filter(e => e.id !== eventId);
    console.log(UpdatedEvents);
    this.setState({
      events: UpdatedEvents
    }); */
  };

  render() {
    const  {events, loading} = this.props;
    if (this.state.loadingInitial) return <LoadingComponent inverted={true}/> 
    //console.log(loading);
    /* if (!isLoaded(events) || isEmpty(events)) return <LoadingComponent inverted={true}/> */ /*Setting the inverted property to true changes the default dark overlay to a white one*/
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            deleteEvent={this.handleDeleteEvent}
            events={/* this.state. */this.state.loadedEvents}
          />
          <Button loading={loading} onClick={this.getNextEvent} disabled={!this.state.moreEvents} content="More" color="green" floated="right" />
        </Grid.Column>
        <Grid.Column width={6}>
         <EventActivity/>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapState,
  actions
)(firestoreConnect([{collection: 'events'}])(EventDashboard));
//The firestore connect higher order component here acts more of like a listener here for our events collections