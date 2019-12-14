import React, {Component} from 'react';
import {Button, Card, Grid, Header, Icon, Image, Item, List, Menu, Segment} from "semantic-ui-react";
import UserDetailedEvents from './UserDetailedEvents';
import UserDetailedPhotos from './UserDetailedPhotos';

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
                <Grid.Column width={12}>
                    <Segment>
                        <Grid columns={2}>
                            <Grid.Column width={10}>
                                <Header icon='smile' content='About Display Name'/>
                                <p>I am a: <strong>Occupation Placeholder</strong></p>
                                <p>Originally from <strong>United Kingdom</strong></p>
                                <p>Member Since: <strong>28th March 2018</strong></p>
                                <p>Description of user</p>

                            </Grid.Column>
                            <Grid.Column width={6}>

                                <Header icon='heart outline' content='Interests'/>
                                <List>
                                    <Item>
                                        <Icon name='heart'/>
                                        <Item.Content>Interest 1</Item.Content>
                                    </Item>
                                    <Item>
                                        <Icon name='heart'/>
                                        <Item.Content>Interest 2</Item.Content>
                                    </Item>
                                    <Item>
                                        <Icon name='heart'/>
                                        <Item.Content>Interest 3</Item.Content>
                                    </Item>
                                </List>
                            </Grid.Column>
                        </Grid>

                    </Segment>
                </Grid.Column>
              
               <UserDetailedPhotos/>
               <UserDetailedEvents/>
            </Grid>

        );
    }
}

export default UserDetailedPage;