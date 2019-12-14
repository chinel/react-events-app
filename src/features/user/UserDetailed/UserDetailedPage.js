import React, {Component} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import {Grid} from "semantic-ui-react";
import UserDetailedEvents from './UserDetailedEvents';
import UserDetailedPhotos from './UserDetailedPhotos';
import UserDetailedSidebar from './UserDetailedSidebar';
import UserDetailedDescription from './UserDetailedDescription';
import UserDetailedHeader from './UserDetailedHeader';


const query = ({auth}) =>  {
    return [
        {
          collection: "users",
          doc: auth.uid,
          subcollections: [{ collection: "photos" }],
          storeAs: "photos"
        }
      ];  
}

const mapState = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  photos: state.firestore.ordered.photos
});


class UserDetailedPage extends Component {


    render() {
     const {profile, photos} = this.props;
        return (
            <Grid>
                 <UserDetailedHeader profile={profile}/>
                <UserDetailedDescription/>
                <UserDetailedSidebar/>
                {photos && photos.length > 0 &&
               <UserDetailedPhotos photos={photos}/>
                }
               <UserDetailedEvents/>
            </Grid>

        );
    }
}

export default compose(connect(mapState), firestoreConnect(auth => query(auth)))(UserDetailedPage);