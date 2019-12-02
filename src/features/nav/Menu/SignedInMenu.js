import React from "react";
import { Menu, Image, Dropdown } from "semantic-ui-react";
import { Link } from 'react-router-dom'
const SignedInMenu = ({signOut, currentUser, auth/*auth from the auth props passed down from the navbar*/}) => {
  return (
    <Menu.Item position="right">
      <Image avatar spaced="right" src="/assets/user.png" />
      <Dropdown pointing="top left" /* text={currentUser} instead of using the currentuser as of before we will be using the auth props */ text={auth.email}>
        <Dropdown.Menu>
          <Dropdown.Item text="Create Event" icon="plus" />
          <Dropdown.Item text="My Events" icon="calendar" />
          <Dropdown.Item text="My Network" icon="users" />
          <Dropdown.Item text="My Profile" icon="user" />
          <Dropdown.Item as={Link} to="/settings" text="Settings" icon="settings" />
          <Dropdown.Item onClick={signOut} text="Sign Out" icon="power" />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};

export default SignedInMenu;
