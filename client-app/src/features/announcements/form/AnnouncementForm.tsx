import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { IAnnouncement } from '../../../app/Models/announcement';
import { v4 as uuid } from 'uuid';
import AnnouncementStore from '../../../app/stores/announcementStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';

interface DetailParams {
  id: string;
}

const AnnouncementForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const announcementStore = useContext(AnnouncementStore);
  const {
    createAnnouncement,
    editAnnouncement,
    submitting,
    announcement: initialFormState,
    loadAnnouncement,
    clearAnnouncement
  } = announcementStore;

  const [announcement, setAnnouncement] = useState<IAnnouncement>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    location: '',
    room: ''
  });

  useEffect(() => {
    if (match.params.id && announcement.id.length === 0) {
      loadAnnouncement(match.params.id).then(
        () => initialFormState && setAnnouncement(initialFormState)
      );
    }
    return () => {
      clearAnnouncement()
    }
  }, [loadAnnouncement, clearAnnouncement, match.params.id, initialFormState, announcement.id.length]);

  const handleSubmit = () => {
    if (announcement.id.length === 0) {
      let newAnnouncement = {
        ...announcement,
        id: uuid()
      };
      createAnnouncement(newAnnouncement).then(() => history.push(`/announcements/${newAnnouncement.id}`))
    } else {
      editAnnouncement(announcement).then(() => history.push(`/announcements/${announcement.id}`));
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setAnnouncement({ ...announcement, [name]: value });
  };

  return (
    <Grid>
      <Grid.Column width={10}>
      <Segment className="create-form" clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name='title'
          placeholder='Title'
          value={announcement.title}
        />
        <Form.TextArea
          id="form-textarea"
          onChange={handleInputChange}
          name='description'
          rows={2}
          placeholder='Description'
          value={announcement.description}
        />
        <Form.Input
          onChange={handleInputChange}
          name='category'
          placeholder='Category'
          value={announcement.category}
        />
        <Form.Input
          onChange={handleInputChange}
          name='date'
          type='datetime-local'
          placeholder='Date'
          value={announcement.date}
        />
        <Form.Input
          onChange={handleInputChange}
          name='location'
          placeholder='Location'
          value={announcement.location}
        />
        <Form.Input
          onChange={handleInputChange}
          name='room'
          placeholder='Room'
          value={announcement.room}
        />
        <Button
          loading={submitting}
          floated='right'
          positive
          type='submit'
          content='Submit'
        />
        <Button
          onClick={() => history.push('/announcements')}
          floated='right'
          type='button'
          content='Cancel'
        />
      </Form>
    </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(AnnouncementForm);
