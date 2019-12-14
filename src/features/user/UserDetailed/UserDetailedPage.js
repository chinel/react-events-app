import React, {Component} from 'react';
import {Button, Card, Grid, Header, Icon, Image, Item, List, Menu, Segment} from "semantic-ui-react";
import UserDetailedEvents from './UserDetailedEvents';
import UserDetailedPhotos from './UserDetailedPhotos';
import UserDetailedSidebar from './UserDetailedSidebar';
import UserDetailedDescription from './UserDetailedDescription';

class UserDetailedPage extends Component {

    render() {

        return (
            <Grid>
                <Grid.Column width={16}>
                    <Segment>
                        <Item.Group>
                            <Item>
                                <Item.Image avatar size='small' src='https://randomuser.me/api/portraits/men/20.jpg'/>
                                <Item.Content verticalAlign='bottom'>
                                    <Header as='h1'>First Name</Header>
                                    <br/>
                                    <Header as='h3'>Occupation</Header>
                                    <br/>
                                    <Header as='h3'>27, Lives in London, UK</Header>
                                </Item.Content>
                            </Item>
                        </Item.Group>

                    </Segment>
                </Grid.Column>
                <UserDetailedDescription/>
                <UserDetailedSidebar/>
               <UserDetailedPhotos/>
               <UserDetailedEvents/>
            </Grid>

        );
    }
}

export default UserDetailedPage;