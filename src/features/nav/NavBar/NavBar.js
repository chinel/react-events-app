import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, Link, withRouter } from "react-router-dom";
import { Menu, Container, Button } from "semantic-ui-react";
import SignedOutMenu from "../Menu/SignedOutMenu";
import SignedInMenu from "../Menu/SignedInMenu";
import { openModal } from "../../modals/modalActions";
import { signOutUser } from '../../auth/authActions';

const actions = {
  openModal,
  signOutUser

};

const mapState = (state) => ({
  auth: state.auth
})

class NavBar extends Component {
 

  handleSignIn = () => {
    this.props.openModal("LoginModal");
  };

  handleRegister = () => {
    this.props.openModal("RegisterModal");
  };

  handleSignOut = () => {
    this.props.signOutUser();
  /*   this.setState({
      authenticated: false
    }); */
    this.props.history.push("/");
  };

  render() {
    const { auth } = this.props;
    const authenticated = auth.authenticated
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item header as={Link} to="/">
            <img src="/assets/logo.png" alt="logo" />{" "}
            {/* The / infront of the assets makes it a relative path*/}
            Re-vents
          </Menu.Item>

          <Menu.Item as={NavLink} to="/events" name="Events" />
          <Menu.Item as={NavLink} to="/test" name="Test" />
          {authenticated && (
            <Menu.Item as={NavLink} to="/people" name="People" />
          )}
          {authenticated && (
            <Menu.Item>
              <Button
                as={Link}
                to="/createEvent"
                floated="right"
                positive
                inverted
                content="Create Event"
              />{" "}
            </Menu.Item>
          )}

          {authenticated ? (
            <SignedInMenu currentUser={auth.currentUser} signOut={this.handleSignOut} />
          ) : (
            <SignedOutMenu
              signIn={this.handleSignIn}
              register={this.handleRegister}
            />
          )}
        </Container>
      </Menu>
    );
  }
}

export default withRouter(connect(mapState, actions)(NavBar));
