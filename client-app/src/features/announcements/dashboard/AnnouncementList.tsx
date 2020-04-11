import React from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { IAnnouncement } from "../../../app/Models/announcement";

interface IProps {
  announcements: IAnnouncement[];
  selectAnnouncement: (id: string) => void;
  selectedAnnouncement: IAnnouncement | null;
  deleteAnnouncement: (id: string) => void;
}

export const AnnouncementList: React.FC<IProps> = ({
  announcements,
  selectAnnouncement,
  deleteAnnouncement
}) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {announcements.map((announcement) => (
          <Item key={announcement.id}>
            <Item.Content>
              <Item.Header as="a">{announcement.title}</Item.Header>
              <Item.Meta>{announcement.date}</Item.Meta>
              <Item.Description>
                <div>{announcement.description}</div>
                <div>
                  {announcement.location}, {announcement.room}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => selectAnnouncement(announcement.id)}
                  floated="right"
                  content="View"
                  color="blue"
                ></Button>
                <Button
                  onClick={() => deleteAnnouncement(announcement.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                ></Button>
                <Label basic content={announcement.category}></Label>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};
