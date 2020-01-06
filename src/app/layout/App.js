import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Loadable from 'react-loadable';
import { Container } from "semantic-ui-react";
import { UserIsAuthenticated } from '../../features/auth/authWrapper';
import LoadingComponent from "./LoadingComponent";

const AsyncHomePage = Loadable({  //Loadable is a higher order component which we wrap around our import and then if there is any delay it will show the Loading component
  loader: () => import("../../features/home/HomePage"),
  loading: LoadingComponent
})

const AsyncEventForm = Loadable({
  loader: () => import('../../features/event/EventForm/EventForm'),
  loading: LoadingComponent
})


const AsyncNavBar = Loadable({
  loader: () => import("../../features/nav/NavBar/NavBar"),
  loading: LoadingComponent
})


const AsyncEventDashboard = Loadable({
  loader: () => import("../../features/event/EventDashboard/EventDashboard"),
  loading: LoadingComponent
})


const AsyncSettingsDashboard = Loadable({
  loader: () => import("../../features/user/Settings/SettingsDashboard"),
  loading: LoadingComponent
})

const AsyncUserDetailedPage = Loadable({
  loader: () => import("../../features/user/UserDetailed/UserDetailedPage"),
  loading: LoadingComponent
})

const AsyncPeopleDashboard = Loadable({
  loader: () => import("../../features/user/PeopleDashboard/PeopleDashboard"),
  loading: LoadingComponent
})

const AsyncEventDetailedPage = Loadable({
  loader: () => import("../../features/event/EventDetailed/EventDetailedPage"),
  loading:LoadingComponent
})

const AsyncModalManager = Loadable({
  loader: () => import("../../features/modals/ModalManager"),
  loading: LoadingComponent
})

const AsyncNotFound = Loadable({
  loader: () => import("../../app/layout/NotFound"),
  loading: LoadingComponent
})

class App extends Component {
  render() {
  return (
    <div>
      <AsyncModalManager/>{/*In other to display modals on the page we will be adding our modal manager to the app.js file */}
      <Switch>
        <Route exact path="/" component={AsyncHomePage} />
        
      </Switch>
     
      <Route
        path="/(.+)"
        render={() => (
          <div>
            <AsyncNavBar />
            <Container className="main">
            <Switch>
              <Route exact  path="/events" component={AsyncEventDashboard} />
              {/* <Route exact  path="/test" component={TestComponent} /> */}
              <Route  path="/event/:id" component={AsyncEventDetailedPage} />
              <Route  path="/manage/:id" component={UserIsAuthenticated(AsyncEventForm)}/>
              <Route   path="/people" component={UserIsAuthenticated(AsyncPeopleDashboard)} />
              <Route   path="/profile/:id" component={UserIsAuthenticated(AsyncUserDetailedPage)} />
              <Route   path="/settings" component={UserIsAuthenticated(AsyncSettingsDashboard)} />
              <Route   path="/createEvent" component={UserIsAuthenticated(AsyncEventForm)} />
              <Route  path="/error" component={AsyncNotFound} />
              <Route   component={AsyncNotFound} />
              </Switch>
            </Container>
          </div>
        )}
      />
     
    </div>
  );
        }
      }


export default App;
