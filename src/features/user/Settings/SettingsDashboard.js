import React from 'react';
import {  connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import SettingsNav from './SettingsNav';
import { Switch, Route, Redirect} from 'react-router-dom'
import AboutPage from './AboutPage';
import AccountPage from './AccountPage';
import BasicPage from './BasicPage';
import PhotosPage from './PhotosPage';
import { updatePassword } from '../../auth/authActions';
import { updateProfile } from '../userActions';

const actions = {
updatePassword,
updateProfile
}

const mapState = (state) => ({
 providerId: state.firebase.auth.providerData[0].providerId,
 user: state.firebase.profile
});

const SettingsDashboard = ({updatePassword, providerId, user, updateProfile}) => {
    return (
        <Grid>
            <Grid.Column width={12}>
            
                <Switch>
                    <Redirect exact from="/settings" to="/settings/basic"/>
                    {/*Here setting the initialValues in this component you do not need to call it inside of the component whatever property field name you have here is mapped to the field names in this component */}
                    <Route path="/settings/basic" render={() => <BasicPage updateProfile={updateProfile} initialValues={user}/>} />
                    <Route path="/settings/about" render={() => <AboutPage updateProfile={updateProfile} />}/>
                    <Route path="/settings/photos" component={PhotosPage}/>
                    {/*If you want to pass props to a component via a route you need to render the component instead of just stating the component so that you can pass down props to the component */}
                    <Route path="/settings/account"  render={() => <AccountPage updatePassword={updatePassword} providerId={providerId}/>} />
                </Switch>
           
            </Grid.Column>
            <Grid.Column width={4}>
            <SettingsNav/>
            </Grid.Column>
            
        </Grid>
    )
}

export default connect(mapState, actions)(SettingsDashboard);
