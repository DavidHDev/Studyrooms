import React from "react";
import { Card, Button } from "semantic-ui-react";
import { IAnnouncement } from "../../../app/Models/announcement";

interface IProps {
  announcement: IAnnouncement;
  setEditMode: (editMode: boolean) => void;
  setSelectedAnnouncement: (announcement: IAnnouncement | null) => void;
}

export const AnnouncementDetails: React.FC<IProps> = ({
  announcement,
  setEditMode,
  setSelectedAnnouncement,
}) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{announcement.title}</Card.Header>
        <Card.Meta>
          <span className="date">{announcement.date}</span>
        </Card.Meta>
        <Card.Description>{announcement.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            basic
            color="blue"
            content="Edit"
            onClick={() => setEditMode(true)}
          ></Button>
          <Button onClick={() => setSelectedAnnouncement(null)} basic color="red" content="Close"></Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};
