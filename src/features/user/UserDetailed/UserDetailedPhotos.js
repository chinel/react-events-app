import React from 'react';
import { Grid, Segment, Header, Image } from 'semantic-ui-react';
import LazyLoad from 'react-lazyload';

const UserDetailedPhotos = ({photos}) => {
/*     console.log(photos); */
    return (
        <Grid.Column width={12}>
        
        <Segment attached>
            <Header icon='image' content='Photos'/>
            
            <Image.Group size='small'>
                {photos.map(photo => (
                    <LazyLoad key={photo.id} placeholder={<Image  src='/assets/user.png'/>} height={150}>
                        <Image  src={photo.url}/>
                    </LazyLoad>
                    
                ))}
              
            </Image.Group>
        </Segment>

    </Grid.Column>

    )
}

export default UserDetailedPhotos
