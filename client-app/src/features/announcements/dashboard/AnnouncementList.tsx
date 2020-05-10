import React, { useContext } from 'react';
import { Item, Button, Label, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import AnnouncementStore from '../../../app/stores/announcementStore';
import { Link } from 'react-router-dom';

const AnnouncementList: React.FC = () => {
  const announcementStore = useContext(AnnouncementStore);
  const {
    announcementsByDate,
    deleteAnnouncement,
    submitting,
    target
  } = announcementStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {announcementsByDate.map(announcement => (
          <Item key={announcement.id}>
            <Item.Content>
              <Item.Header as='a'>{announcement.title}</Item.Header>
              <Item.Meta>{announcement.date}</Item.Meta>
              <Item.Description>
                <div>{announcement.description}</div>
                <div>
                  {announcement.location}, {announcement.room}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  as={Link}
                  to={`/announcements/${announcement.id}`}
                  floated='right'
                  content='View'
                  color='blue'
                />
                <Button
                  name={announcement.id}
                  loading={target === announcement.id && submitting}
                  onClick={e => deleteAnnouncement(e, announcement.id)}
                  floated='right'
                  content='Delete'
                  color='red'
                />
                <Label basic content={announcement.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(AnnouncementList);
