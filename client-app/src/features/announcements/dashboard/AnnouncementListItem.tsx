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
              src={host.image || "/assets/user.svg"}
              style={{ marginBottom: "15px" }}
            ></Item.Image>
            <Item.Content>
              <Item.Header className="item-title" as={Link} to={`/announcements/${announcement.id}`}>
                {announcement.title}
              </Item.Header>
              <Item.Description className="created-by">
                Created by
                <Link to={`/profile/${host.username}`}> {host.displayName}</Link>
              </Item.Description>
              {announcement.isHost && (
                <Item.Description>
                  <Label className="host-label" content="You are hosting this." />
                </Item.Description>
              )}
              {announcement.isGoing && !announcement.isHost && (
                <Item.Description>
                  <Label className="interested-label"
                    content="You are interested in this."
                  />
                </Item.Description>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment className="time-location">
        <Icon name="clock" /> {format(announcement.date, "h:mm a")}
        &nbsp;<Icon name="marker"/>{announcement.location}, {announcement.room}
      </Segment>
      <hr></hr>
      <Segment secondary>
        <p className="interested">Interested Users</p>
        <AnnouncementListItemAttendees attendees={announcement.attendees} />
      </Segment>
      <hr></hr>
      <Segment clearing>
        <span>{announcement.description}</span>
        <Button
          as={Link}
          to={`/announcements/${announcement.id}`}
          floated="right"
          content="View Details"
          color="blue"
        />
      </Segment>
    </Segment.Group>
  );
};

export default AnnouncementListItem;
