import React from 'react'
import { Loader, Dimmer  } from 'semantic-ui-react';

const LoadingComponent = ({inverted}) => {
    return (
        <Dimmer inverted={inverted} active={true}>
         <Loader content="Loading..."/>
        </Dimmer>
     
    )
}

export default LoadingComponent
