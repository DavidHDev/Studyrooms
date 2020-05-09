import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import  Navbar from "../../features/nav/Navbar";
import AnnouncementDashboard from "../../features/announcements/dashboard/AnnouncementDashboard";
import LoadingComponent from "./LoadingComponent";
import {observer} from 'mobx-react-lite';
import AnnouncementStore from '../stores/announcementStore';

const App = () => {
  const announcementStore = useContext(AnnouncementStore)

  useEffect(() => {
    announcementStore.loadAnnouncements();
  }, [announcementStore]);

  if (announcementStore.loadingInitial) return <LoadingComponent content="Loading Announcements" />

  return (
    <Fragment>
      <Navbar />
      <Container style={{marginTop: '7em'}}>
        <AnnouncementDashboard />
      </Container>
    </Fragment>
  );
};

export default observer(App);