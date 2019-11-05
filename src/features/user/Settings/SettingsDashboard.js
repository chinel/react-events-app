import React from 'react';
import { Grid } from 'semantic-ui-react';
import SettingsNav from './SettingsNav';
import { Switch, Route} from 'react-router-dom'
import AboutPage from './AboutPage';
import AccountPage from './AccountPage';
import BasicPage from './BasicPage';
import PhotosPage from './PhotosPage';

const SettingsDashboard = () => {
    return (
        <Grid>
            <Grid.Column width={12}>
                <Switch>
                    <Route path="/settings/basic" component={BasicPage}/>
                    <Route path="/settings/about" component={AboutPage}/>
                    <Route path="/settings/photos" component={PhotosPage}/>
                    <Route path="/settings/account" component={AccountPage}/>
                </Switch>
           
            </Grid.Column>
            <Grid.Column width={4}>
            <SettingsNav/>
            </Grid.Column>
            
        </Grid>
    )
}

export default SettingsDashboard
