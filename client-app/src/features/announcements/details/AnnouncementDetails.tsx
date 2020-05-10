import React, { useContext, useEffect } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import AnnouncementStore from '../../../app/stores/announcementStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import LoadingComponent from '../../../app/Layout/LoadingComponent';
import { Link } from 'react-router-dom';

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
  }, [loadAnnouncement, match.params.id]);

  if (loadingInitial || !announcement) return <LoadingComponent content='Loading announcement...' />

  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${announcement!.category}.png`}
        wrapped
        ui={false}
      />
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
            as={Link} to={`/manage/${announcement.id}`}
            basic
            color='blue'
            content='Edit'
          />
          <Button
            onClick={() => history.push('/announcements')}
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
