import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import AnnouncementList from './AnnouncementList';
import { observer } from 'mobx-react-lite';
import AnnouncementStore from '../../../app/stores/announcementStore';
import LoadingComponent from '../../../app/Layout/LoadingComponent';

const AnnouncementDashboard: React.FC = () => {

  const announcementStore = useContext(AnnouncementStore);

  useEffect(() => {
    announcementStore.loadAnnouncements();
  }, [announcementStore]);

  if (announcementStore.loadingInitial)
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
