import React, {Component} from 'react';
import {Button, Card, Grid, Header, Icon, Image, Item, List, Menu, Segment} from "semantic-ui-react";
import UserDetailedEvents from './UserDetailedEvents';
import UserDetailedPhotos from './UserDetailedPhotos';
import UserDetailedSidebar from './UserDetailedSidebar';
import UserDetailedDescription from './UserDetailedDescription';
import UserDetailedHeader from './UserDetailedHeader';

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

export default UserDetailedPage;