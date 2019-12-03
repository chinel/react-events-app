import React, { Component } from "react";
import {  withFirebase} from 'react-redux-firebase';
import { connect } from "react-redux";
import { NavLink, Link, withRouter } from "react-router-dom";
import { Menu, Container, Button } from "semantic-ui-react";
import SignedOutMenu from "../Menu/SignedOutMenu";
import SignedInMenu from "../Menu/SignedInMenu";
import { openModal } from "../../modals/modalActions";
/* import { signOutUser } from '../../auth/authActions'; */

const actions = {
  openModal,
 /*  signOutUser */

};

const mapState = (state) => ({
  /*auth: state.auth // we will have to use the auth in firebase reducer as opposed to this*/
  auth: state.firebase.auth 
})

class NavBar extends Component {
 

  handleSignIn = () => {
    this.props.openModal("LoginModal");
  };

  handleRegister = () => {
    this.props.openModal("RegisterModal");
  };

  handleSignOut = () => {
  /*   this.props.signOutUser(); Because we are using withFirebase higher order component we will be making use of the logout function from it */
  /*   this.setState({
      authenticated: false
    }); */
    this.props.firebase.logout();
    this.props.history.push("/");
  };

  render() {
    const { auth } = this.props;
    /* const authenticated = auth.authenticated  we will be checking if the user is authenticated from firebase as shown below*/
    const authenticated = auth.isLoaded && !auth.isEmpty;//this checks if the auth is loaded and if the auth is not empty from firebase
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
            <SignedInMenu /* currentUser={auth.currentUser} we will be passing auth details from firebase*/ auth={auth} signOut={this.handleSignOut} />
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

export default withRouter(withFirebase(connect(mapState, actions)(NavBar)));
