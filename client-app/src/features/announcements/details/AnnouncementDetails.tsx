import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import AnnouncementStore from '../../../app/stores/announcementStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import LoadingComponent from '../../../app/Layout/LoadingComponent';
import AnnouncementDetailedHeader from './AnnouncementDetailedHeader';
import AnnouncementDetailedInfo from './AnnouncementDetailedInfo';
import AnnouncementDetailedChat from './AnnouncementDetailedChat';
import AnnouncementDetailedSidebar from './AnnouncementDetailedSidebar';

interface DetailParams {
  id: string;
}

const AnnouncementDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const announcementStore = useContext(AnnouncementStore);
  const {
    announcement,
    loadAnnouncement,
    loadingInitial
  } = announcementStore;

  useEffect(() => {
    loadAnnouncement(match.params.id);
  }, [loadAnnouncement, match.params.id, history]);

  if (loadingInitial) return <LoadingComponent content='Loading announcement...' />

  if (!announcement){
    return <h2>Announcement not found</h2>
  }
    

  return (
    <Grid>
      <Grid.Column width={10}>
        <AnnouncementDetailedHeader announcement = {announcement} />
        <AnnouncementDetailedInfo announcement = {announcement}/>
        <AnnouncementDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <AnnouncementDetailedSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(AnnouncementDetails);
