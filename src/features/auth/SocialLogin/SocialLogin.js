import React from 'react'
import { Button, Icon } from 'semantic-ui-react';

const SocialLogin = ({socialLogin}) => {
    return (
            <div>
              <Button type="button" onClick={() => socialLogin('facebook')} style={{ marginBottom: '10px' }} fluid color="facebook">
                <Icon name="facebook" /> Login with Facebook
              </Button>
        
              <Button type="button" fluid color="google plus">
                <Icon name="google plus" />
                Login with Google
              </Button>
            </div>
    )
}

export default SocialLogin
