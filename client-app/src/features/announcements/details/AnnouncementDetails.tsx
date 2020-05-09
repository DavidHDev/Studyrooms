import React, { useContext } from 'react';
import { Card, Button } from 'semantic-ui-react';
import AnnouncementStore from '../../../app/stores/announcementStore';
import { observer } from 'mobx-react-lite';

const AnnouncementDetails: React.FC = () => {
  const announcementStore = useContext(AnnouncementStore);
  const { selectedAnnouncement: announcement, openEditForm, cancelSelectedAnnouncement } = announcementStore;
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{announcement!.title}</Card.Header>
        <Card.Meta>
          <span>{announcement!.date}</span>
        </Card.Meta>
        <Card.Description>{announcement!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            onClick={() => openEditForm(announcement!.id)}
            basic
            color='blue'
            content='Edit'
          />
          <Button
            onClick={cancelSelectedAnnouncement}
            basic
            color='grey'
            content='Cancel'
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(AnnouncementDetails);