import React from "react";
import { Item, Button, Segment, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IAnnouncement } from "../../../app/Models/announcement";

const AnnouncementListItem: React.FC<{ announcement: IAnnouncement }> = ({
  announcement,
}) => {

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
        <Item>
          <Item.Image size="tiny" circular src="/assets/user.png"></Item.Image>
          <Item.Content>
            <Item.Header as="a">{announcement.title}</Item.Header>
            <Item.Description>Created by User</Item.Description>
          </Item.Content>
        </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="clock" /> {announcement.date}
        <Icon name="marker" /> {announcement.location}, {announcement.room}
      </Segment>
      <Segment secondary>Interested Users</Segment>
      <Segment clearing>
        <span>{announcement.description}</span>
        <Button
          as={Link}
          to={`/announcements/${announcement.id}`}
          floated="right"
          content="View"
          color='blue'
        />
      </Segment>
    </Segment.Group>
  );
};

export default AnnouncementListItem;
