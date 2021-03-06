import React, { Fragment, useContext, useEffect } from 'react';
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
import { RootStoreContext } from '../stores/rootStore';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import ProfilePage from '../../features/profiles/ProfilePage';
import PrivateRoute from './PrivateRoute';

const App: React.FC<RouteComponentProps> = ({ location }) => {

  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded())
    } else {
      setAppLoaded()
    }
  }, [getUser, setAppLoaded, token])

  if (!appLoaded) return <LoadingComponent content='Loading App' />

  return (
    <Fragment>
      <ModalContainer></ModalContainer>
      <ToastContainer position='bottom-right'/>
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <NavBar />
            <Container className="big-container">
              <Switch>
              <PrivateRoute exact path='/announcements' component={AnnouncementDashboard} />
              <PrivateRoute path='/announcements/:id' component={AnnouncementDetails} />
              <PrivateRoute
                key={location.key}
                path={['/createAnnouncement', '/manage/:id']}
                component={AnnouncementForm}
              />
              <PrivateRoute path="/profile/:username" component={ProfilePage} />
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