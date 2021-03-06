import React, { Component } from "react";
import { Grid , Loader} from "semantic-ui-react";
import { firestoreConnect/* , isLoaded, isEmpty */} from 'react-redux-firebase';
import EventList from "../EventList/EventList";
import { connect } from "react-redux";
import {/* deleteEvent, */ getEventsForDashboard } from "../eventActions";
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventActivity from "../EventActivity/EventActivity";

const query = [{
  collection: 'activity',
  orderBy: ["timestamp","desc"],
  limit: 5
}]


const mapState = state => ({
  events: state.events,
  loading: state.async.loading
/*   events: state.firestore.ordered.events,
 */  /* loading: state.async.loading, */,
 activities: state.firestore.ordered.activity
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
    loadedEvents: [],
    contextRef: {}
  }

  async componentDidMount(){
   let next = await this.props.getEventsForDashboard();
  /*  console.log(next); */

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
  /*   console.log(lastEvent); */
    let next = await this.props.getEventsForDashboard(lastEvent);
/*     console.log(next); */
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

  handleContextRef =  contextRef => this.setState({contextRef})

  render() {
    const  {/* events, */ loading, activities} = this.props;
    if (this.state.loadingInitial) return <LoadingComponent inverted={true}/> 
    const {moreEvents, loadedEvents} = this.state;
    //console.log(loading);
    /* if (!isLoaded(events) || isEmpty(events)) return <LoadingComponent inverted={true}/> */ /*Setting the inverted property to true changes the default dark overlay to a white one*/
    return (
      <Grid>
        <Grid.Column width={10}>
         <div ref={this.handleContextRef}>
         <EventList
            loading={loading}
            moreEvents={moreEvents}
            deleteEvent={this.handleDeleteEvent}
            events={loadedEvents}
            getNextEvent={this.getNextEvent}
          />
         </div>
        </Grid.Column>
        <Grid.Column width={6}>
         <EventActivity activities={activities} contextRef={this.state.contextRef}/>
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={loading}/>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapState,
  actions
)(firestoreConnect(query)(EventDashboard));
//The firestore connect higher order component here acts more of like a listener here for our events collections