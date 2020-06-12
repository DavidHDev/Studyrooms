import React from "react";
import { Item, Button, Segment, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IAnnouncement } from "../../../app/Models/announcement";
import { format } from "date-fns";
import AnnouncementListItemAttendees from "./AnnouncementListItemAttendees";

const AnnouncementListItem: React.FC<{ announcement: IAnnouncement }> = ({
  announcement,
}) => {
  const host = announcement.attendees.filter((x) => x.isHost)[0];
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              size="tiny"
              circular
              src={host.image || "/assets/user.png"}
              style={{ marginBottom: "3px" }}
            ></Item.Image>
            <Item.Content>
              <Item.Header as={Link} to={`/announcements/${announcement.id}`}>
                {announcement.title}
              </Item.Header>
              <Item.Description>
                Created by
                <Link to={`/profile/${host.username}`}> {host.displayName}</Link>
              </Item.Description>
              {announcement.isHost && (
                <Item.Description>
                  <Label basic color="orange" content="You are hosting this." />
                </Item.Description>
              )}
              {announcement.isGoing && !announcement.isHost && (
                <Item.Description>
                  <Label
                    basic
                    color="green"
                    content="You are interested in this."
                  />
                </Item.Description>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="clock" /> {format(announcement.date, "h:mm a")}
        <Icon name="marker" /> {announcement.location}, {announcement.room}
      </Segment>
      <Segment secondary>
        <AnnouncementListItemAttendees attendees={announcement.attendees} />
      </Segment>
      <Segment clearing>
        <span>{announcement.description}</span>
        <Button
          as={Link}
          to={`/announcements/${announcement.id}`}
          floated="right"
          content="View"
          color="blue"
        />
      </Segment>
    </Segment.Group>
  );
};

export default AnnouncementListItem;
