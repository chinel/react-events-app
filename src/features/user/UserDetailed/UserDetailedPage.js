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
  photos: state.firestore.ordered.photos
}};


class UserDetailedPage extends Component {


    render() {
     const {profile, photos, auth, match} = this.props;
     const isCurrentUser = auth.uid === match.params.id;
        return (
            <Grid>
                 <UserDetailedHeader profile={profile}/>
                <UserDetailedDescription profile={profile}/>
                <UserDetailedSidebar isCurrentUser={isCurrentUser}/>
                {photos && photos.length > 0 &&
               <UserDetailedPhotos photos={photos}/>
                }
               <UserDetailedEvents/>
            </Grid>

        );
    }
}

export default compose(connect(mapState), firestoreConnect((auth, userUid )=> userDetaileQuery(auth, userUid)))(UserDetailedPage);