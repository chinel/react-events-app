import React from 'react'
import { Grid, Menu, Header } from 'semantic-ui-react'

const SettingsNav = () => {
    return (
            <Grid.Column width={4}>
              <Menu vertical>
                <Header icon="user" attached inverted color="grey" content="Profile" />
                <Menu.Item>Basics</Menu.Item>
                <Menu.Item>About Me</Menu.Item>
                <Menu.Item>My Photos</Menu.Item>
              </Menu>
              <Grid.Row />
              <Menu vertical>
                <Header
                  icon="settings"
                  attached
                  inverted
                  color="grey"
                  content="Account"
                />
                <Menu.Item>My Account</Menu.Item>
              </Menu>
            </Grid.Column>
    )
}

export default SettingsNav
