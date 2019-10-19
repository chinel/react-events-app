import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'

class EventDashboard extends Component {
    render() {
        return (
            <Grid>
                <Grid.Column width={10}>
                   <h1>Left Column</h1>
                </Grid.Column>
                <Grid.Column width={6}>
                <h1>Right Column</h1>
                </Grid.Column>
            </Grid>
        )
    }
}

export default EventDashboard
