import React, { useContext } from "react";
import { Segment, Image, Item, Header, Button } from "semantic-ui-react";
import { IAnnouncement } from "../../../app/Models/announcement";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { RootStoreContext } from "../../../app/stores/rootStore";

const announcementImageStyle = {
  filter: "brightness(80%)",
};

const announcementImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

const AnnouncementDetailedHeader: React.FC<{ announcement: IAnnouncement }> = ({
  announcement,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { attendAnnouncement, cancelAttendance, loading } = rootStore.announcementStore;
  return (
    <Segment.Group>
      <Segment
        className="basic-style"
        basic
        attached="top"
        style={{ padding: "0" }}
      >
        <Image
          src={`/assets/categoryImages/${announcement.category}.png`}
          fluid
          style={announcementImageStyle}
        />
        <Segment basic style={announcementImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={announcement.title}
                  style={{ color: "white" }}
                />
                <p>{format(announcement.date, "eeee do MMMM")}</p>
                <p>
                  Hosted by <strong>Bob</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        {announcement.isHost ? (
          <Button
            as={Link}
            to={`/manage/${announcement.id}`}
            color="orange"
            floated="right"
          >
            Edit
          </Button>
        ) : announcement.isGoing ? (
          <Button loading={loading} onClick={cancelAttendance}>Not Interested</Button>
        ) : (
          <Button loading={loading} onClick={attendAnnouncement} color="teal">Attend</Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default observer(AnnouncementDetailedHeader);
