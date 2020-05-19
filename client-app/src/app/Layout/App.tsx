import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/Navbar';
import AnnouncementDashboard from '../../features/announcements/dashboard/AnnouncementDashboard';
import { observer } from 'mobx-react-lite';
import { Route, withRouter, RouteComponentProps, Switch } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import AnnouncementForm from '../../features/announcements/form/AnnouncementForm';
import { ToastContainer } from 'react-toastify';
import AnnouncementDetails from '../../features/announcements/details/AnnouncementDetails';
import NotFound from './NotFound';

const App: React.FC<RouteComponentProps> = ({ location }) => {


  return (
    <Fragment>
      <ToastContainer position='bottom-right'/>
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <NavBar />
            <Container className="big-container">
              <Switch>
              <Route exact path='/announcements' component={AnnouncementDashboard} />
              <Route path='/announcements/:id' component={AnnouncementDetails} />
              <Route
                key={location.key}
                path={['/createAnnouncement', '/manage/:id']}
                component={AnnouncementForm}
              />
              <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));