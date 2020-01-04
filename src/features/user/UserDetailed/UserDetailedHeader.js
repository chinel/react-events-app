import React from 'react';
import {  Grid, Segment, Item, Header} from 'semantic-ui-react';
import differenceInYears from 'date-fns/difference_in_years';

const UserDetailedHeader = ({profile}) => {
   
   /*  console.log(profile.dateOfBirth) */
    let age;
    if(profile.dateOfBirth){
    age =  differenceInYears(Date.now(), profile.dateOfBirth);
    }
    else{
        age = 'unknown age';
    }
    return (
        <Grid.Column width={16}>
                    <Segment>
                        <Item.Group>
                            <Item>
                                <Item.Image avatar size='small' src={profile.photoURL || '/assets/user.png'} />
                                <Item.Content verticalAlign='bottom'>
    <Header as='h1'>{profile.displayName}</Header>
                                    <br/>
    <Header as='h3'>{profile.occupation}</Header>
                                    <br/>
    <Header as='h3'>{age}, {profile.origin ? `Lives in ${profile.origin}` : 'Unknown Place'}</Header>
                                </Item.Content>
                            </Item>
                        </Item.Group>

                    </Segment>
                </Grid.Column>
    )
}

export default UserDetailedHeader
