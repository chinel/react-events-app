import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";
import EventDashboard from "../../features/event/EventDashboard/EventDashboard";
import NavBar from "../../features/nav/NavBar/NavBar";
import PeopleDashboard from "../../features/user/PeopleDashboard/PeopleDashboard";
import SettingsDashboard from "../../features/user/Settings/SettingsDashboard";
import EventForm from "../../features/event/EventForm/EventForm";
import UserDetailedPage from "../../features/user/UserDetailed/UserDetailedPage";
import EventDetailedPage from "../../features/event/EventDetailed/EventDetailedPage";
import HomePage from "../../features/home/HomePage";
import TestComponent from "../../features/testarea/TestComponent";
import ModalManager from "../../features/modals/ModalManager";

function App() {
  return (
    <div>
      <ModalManager/>{/*In other to display modals on the page we will be adding our modal manager to the app.js file */}
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
      <Route
        path="/(.+)"
        render={() => (
          <div>
            <NavBar />
            <Container className="main">
              <Route path="/events" component={EventDashboard} />
              <Route path="/test" component={TestComponent} />
              <Route path="/event/:id" component={EventDetailedPage} />
              <Route path="/manage/:id" component={EventForm}/>
              <Route path="/people" component={PeopleDashboard} />
              <Route path="/profile:id" component={UserDetailedPage} />
              <Route path="/settings" component={SettingsDashboard} />
              <Route path="/createEvent" component={EventForm} />
            </Container>
          </div>
        )}
      />
    </div>
  );
}

export default App;
