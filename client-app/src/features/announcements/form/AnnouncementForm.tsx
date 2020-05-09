import React, { useState, FormEvent, useContext } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IAnnouncement } from '../../../app/Models/announcement';
import {v4 as uuid} from 'uuid';
import AnnouncementStore from '../../../app/stores/announcementStore';
import { observer } from 'mobx-react-lite';

interface IProps {
  announcement: IAnnouncement;
}

const AnnouncementForm: React.FC<IProps> = ({
  announcement: initialFormState,
}) => {
  const announcementStore = useContext(AnnouncementStore);
  const {createAnnouncement, editAnnouncement, submitting, cancelFormOpen} = announcementStore;
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        location: '',
        room: ''
      };
    }
  };

  const [announcement, setAnnouncement] = useState<IAnnouncement>(initializeForm);

  const handleSubmit = () => {
    if (announcement.id.length === 0) {
      let newAnnouncement = {
        ...announcement,
        id: uuid()
      };
      createAnnouncement(newAnnouncement);
    } else {
      editAnnouncement(announcement);
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setAnnouncement({ ...announcement, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name='title'
          placeholder='Title'
          value={announcement.title}
        />
        <Form.TextArea
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
          name='city'
          placeholder='City'
          value={announcement.location}
        />
        <Form.Input
          onChange={handleInputChange}
          name='venue'
          placeholder='Venue'
          value={announcement.room}
        />
        <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
        <Button
          onClick={cancelFormOpen}
          floated='right'
          type='button'
          content='Cancel'
        />
      </Form>
    </Segment>
  );
};

export default observer(AnnouncementForm);