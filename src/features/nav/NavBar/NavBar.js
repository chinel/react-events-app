import React, { Component } from "react";
import { NavLink, Link} from 'react-router-dom';
import { Menu, Container, Button } from "semantic-ui-react";
import SignedOutMenu from "../Menu/SignedOutMenu";
import SignedInMenu from "../Menu/SignedInMenu";

class NavBar extends Component {
  render() {
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item header as={Link} to="/">
            <img src="assets/logo.png" alt="logo" />
            Re-vents
          </Menu.Item>
          <Menu.Item as={NavLink} to="/events" name="Events" />
          <Menu.Item as={NavLink} to="/people" name="People" />
          <Menu.Item>
            <Button as={Link} to="/createEvent" floated="right" positive inverted content="Create Event" />
          </Menu.Item>
          <SignedInMenu/>
         <SignedOutMenu/>
        </Container>
      </Menu>
    );
  }
}

export default NavBar;
