import React, { useContext } from 'react';
import { Grid } from 'semantic-ui-react';
import AnnouncementList from './AnnouncementList';
import AnnouncementDetails from '../details/AnnouncementDetails';
import AnnouncementForm from '../form/AnnouncementForm';
import { observer } from 'mobx-react-lite';
import AnnouncementStore from '../../../app/stores/announcementStore';

const AnnouncementDashboard: React.FC = () => {
  const announcementStore = useContext(AnnouncementStore);
  const {editMode, selectedAnnouncement} = announcementStore;
  return (
    <Grid>
      <Grid.Column width={10}>
        <AnnouncementList />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedAnnouncement && !editMode && (
          <AnnouncementDetails />
        )}
        {editMode && (
          <AnnouncementForm
            key={(selectedAnnouncement && selectedAnnouncement.id) || 0}
            announcement={selectedAnnouncement!}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(AnnouncementDashboard);
