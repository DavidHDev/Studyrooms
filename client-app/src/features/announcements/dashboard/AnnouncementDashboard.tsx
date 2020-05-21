import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import AnnouncementList from './AnnouncementList';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/Layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';

const AnnouncementDashboard: React.FC = () => {

  const rootStore = useContext(RootStoreContext);
  const {loadAnnouncements, loadingInitial} = rootStore.announcementStore;

  useEffect(() => {
    loadAnnouncements();
  }, [loadAnnouncements]);

  if (loadingInitial)
    return <LoadingComponent content='Loading announcements...' />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <AnnouncementList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2 className="filter-title">Announcement filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(AnnouncementDashboard);
