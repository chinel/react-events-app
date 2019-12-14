import React, {Component} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
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
  auth: state.firebase.auth
});


class UserDetailedPage extends Component {


    render() {

        return (
            <Grid>
                 <UserDetailedHeader/>
                <UserDetailedDescription/>
                <UserDetailedSidebar/>
               <UserDetailedPhotos/>
               <UserDetailedEvents/>
            </Grid>

        );
    }
}

export default compose(connect(mapState), firebaseConnect(auth => query(auth)))(UserDetailedPage);