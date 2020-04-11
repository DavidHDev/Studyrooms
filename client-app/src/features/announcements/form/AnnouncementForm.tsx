import React, { FormEvent } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IAnnouncement } from "../../../app/Models/announcement";
import { useState } from "react";
import { v4 as uuid } from 'uuid';

interface IProps {
  setEditMode: (editMode: boolean) => void;
  announcement: IAnnouncement;
  createAnnouncement: (announcement: IAnnouncement) => void;
  editAnnouncement: (announcement: IAnnouncement) => void;
}

export const AnnouncementForm: React.FC<IProps> = ({
  setEditMode,
  announcement: initialFormState,
  createAnnouncement,
  editAnnouncement
}) => {
  const initForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        location: "",
        room: "",
      };
    }
  };

  const [announcement, setAnnouncement] = useState<IAnnouncement>(initForm);

  const handleSubmit = () => {
      if (announcement.id.length === 0){
        let newAnnouncement = {
          ...announcement,
          id: uuid()
        }
        createAnnouncement(newAnnouncement);
      }
      else {
        editAnnouncement(announcement);
      }
  }

  const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setAnnouncement({ ...announcement, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="title"
          placeholder="Title"
          value={announcement.title}
        />
        <Form.TextArea
          placeholder="Description"
          value={announcement.description}
          onChange={handleInputChange}
          name="description"
        />
        <Form.Input
          placeholder="Category"
          value={announcement.category}
          onChange={handleInputChange}
          name="category"
        />
        <Form.Input
          type="datetime-local"
          placeholder="Date"
          value={announcement.date}
          onChange={handleInputChange}
          name="date"
        />
        <Form.Input
          placeholder="Location"
          value={announcement.location}
          onChange={handleInputChange}
          name="location"
        />
        <Form.Input
          placeholder="Room"
          value={announcement.room}
          onChange={handleInputChange}
          name="room"
        />
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          onClick={() => setEditMode(false)}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};
