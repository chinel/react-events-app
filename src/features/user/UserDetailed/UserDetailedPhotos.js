import React from 'react';
import { Grid, Segment, Header, Image } from 'semantic-ui-react';

const UserDetailedPhotos = ({photos}) => {
    console.log(photos);
    return (
        <Grid.Column width={12}>
        
        <Segment attached>
            <Header icon='image' content='Photos'/>
            
            <Image.Group size='small'>
                {photos.map(photo => (
                    <Image key={photo.id} src={photo.url}/>
                ))}
              
            </Image.Group>
        </Segment>

    </Grid.Column>

    )
}

export default UserDetailedPhotos
