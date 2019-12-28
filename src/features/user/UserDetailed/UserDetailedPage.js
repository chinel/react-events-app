import React, {Component} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import {Grid} from "semantic-ui-react";
import UserDetailedEvents from './UserDetailedEvents';
import UserDetailedPhotos from './UserDetailedPhotos';
import UserDetailedSidebar from './UserDetailedSidebar';
import UserDetailedDescription from './UserDetailedDescription';
import UserDetailedHeader from './UserDetailedHeader';
import { userDetaileQuery } from '../userQueries';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { getUserEvents} from '../userActions';




const mapState = (state, ownProps) => {
  let userUid = null;
  let profile = {};

  if(ownProps.match.params.id === state.auth.uid){

   profile= state.firebase.profile

  }
  else{
   profile = !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0]
   userUid = ownProps.match.params.id

  }
return {
  auth: state.firebase.auth,
  profile, //this is the same as profile: profile
  userUid,
  events: state.events,
  eventsLoading:state.async.loading,
  photos: state.firestore.ordered.photos,
  requesting: state.firestore.status.requesting
}};

const actions = {
  getUserEvents
}


class UserDetailedPage extends Component {

async componentDidMount(){
  let events = await this.props.getUserEvents(this.props.userUid);
  console.log(events)
}  


changeTab = (e, data) => {
 this.props.getUserEvents(this.props.userUid, data.activeIndex);
}



    render() {
     const {profile, photos, auth, match, requesting, events, eventsLoading} = this.props;
     const isCurrentUser = auth.uid === match.params.id;
     const loading = Object.values(requesting).some(a => a === true);//this gets the values of an object and checks if there is any value of that object that is === true
     
     if(loading) return <LoadingComponent inverted={true}/>
     return (
            <Grid>
                 <UserDetailedHeader profile={profile}/>
                <UserDetailedDescription profile={profile}/>
                <UserDetailedSidebar isCurrentUser={isCurrentUser}/>
                {photos && photos.length > 0 &&
               <UserDetailedPhotos photos={photos}/>
                }
               <UserDetailedEvents eventsLoading={eventsLoading} events={events} changeTab={this.changeTab}/>
            </Grid>

        );
    }
}

export default compose(connect(mapState, actions), firestoreConnect((auth, userUid )=> userDetaileQuery(auth, userUid)))(UserDetailedPage);