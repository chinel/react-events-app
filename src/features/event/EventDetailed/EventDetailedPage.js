import React, { Component } from "react";
import { connect } from "react-redux";
import { withFirestore, firebaseConnect, isEmpty } from "react-redux-firebase";
import { compose } from "redux";
import { Grid } from "semantic-ui-react";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";
import { toastr } from "react-redux-toastr";
import { objectToArray , createDataTree} from "../../../app/common/util/helpers";
import { goingToEvent, cancelGoingToEvent } from "../../user/userActions";
import { addEventComment } from "../eventActions";
import { openModal } from '../../modals/modalActions';
import LoadingComponent from "../../../app/layout/LoadingComponent";

const mapState = (state, ownProps) => {
  //Here ownProps is the props already available to the component such as the history, match, location object if routing is applied and so on and so forth
  //const eventId = ownProps.match.params.id;   we would no longer be needing to use the match inside of here as it is used in the componentDidMount react lifecycle method already

  let event = {};

  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    //event = state.events.filter(event => event.id === eventId)[0];
    event = state.firestore.ordered.events[0];
  }

  return {
    requesting: state.firestore.status.requesting,
    event,
    loading: state.async.loading,
    auth: state.firebase.auth,
    eventChat:
      !isEmpty(state.firebase.data.event_chat) &&
      objectToArray(state.firebase.data.event_chat[ownProps.match.params.id])
  };
};

const actions = {
  goingToEvent,
  cancelGoingToEvent,
  addEventComment,
  openModal
};

class EventDetailedPage extends Component {

  state = {
    initialLoading: true
  }


  async componentDidMount() {
    const { firestore, match /* history */ } = this.props;
    let event = await firestore.get(`events/${match.params.id}`);
    if(!event.exists){
      toastr.error("Not Found", "The Event you are looking for could not be found");
      this.props.history.push('/error');
    }
    await firestore.setListener(`events/${match.params.id}`);
    this.setState({
      initialLoading: false
    })
    /*  console.log(event);
   if(!event.exists){
    history.push('/events');
    toastr.error("Sorry", "Event Not Found");
   } */
  }

  async componentWillMount() {
    const { firestore, match /* history */ } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  render() {
    const {
      requesting,
      match,
      openModal,
      loading,
      event,
      auth,
      goingToEvent,
      cancelGoingToEvent,
      addEventComment,
      eventChat
    } = this.props;
    const attendees =
      event && event.attendees && objectToArray(event.attendees).sort((a,b) => {
        return a.joinDate - b.joinDate})
      ; //this check to see if there are events and if there are also attendees under the events then it uses the objectToArray helper method to convert it to an array
    const isHost = event.hostUid === auth.uid;
    const isGoing = attendees && attendees.some(a => a.id === auth.uid); //this check to see if attendees is present and if attendees has an id matching auth id it returns true or false    return (
    const chatTree = !isEmpty(eventChat) && createDataTree(eventChat);
    const authenticated = auth.isLoaded && !auth.isEmpty;
    const loadingEvent = requesting[`events/${match.params.id}`];
    if (loadingEvent || this.state.initialLoading) return <LoadingComponent inverted={true}/>
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailedHeader
            loading={loading}
            event={event}
            isHost={isHost}
            isGoing={isGoing}
            goingToEvent={goingToEvent}
            cancelGoingToEvent={cancelGoingToEvent}
            authenticated={authenticated}
            openModal={openModal}
          />
          <EventDetailedInfo event={event} />
          {authenticated &&
          <EventDetailedChat
            addEventComment={addEventComment}
            eventId={event.id}
            eventChat={chatTree}
          />}
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailedSidebar attendees={attendees} />
        </Grid.Column>
      </Grid>
    );
  }
}

//the withFirestore Higher order component provides us with firebase and firestore methods that we can use to do a whole lot
export default compose(
  withFirestore,
  connect(mapState, actions),
  firebaseConnect(props => [`event_chat/${props.match.params.id}`])
)(EventDetailedPage);
