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
  top: '50%',
  transform: 'translatey(-50%)',
  left: '5%',
  width: "100%",
  height: "auto",
  color: "white",
};

const AnnouncementDetailedHeader: React.FC<{ announcement: IAnnouncement }> = ({
  announcement,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { attendAnnouncement, cancelAttendance, loading } = rootStore.announcementStore;
  const host = announcement.attendees.filter((x) => x.isHost)[0];
  return (
    <Segment.Group>
      <Segment
        className="basic-style"
        basic
        attached="top"
        style={{ padding: "0", borderRadius: "10px"}}
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
                  className="ann-item-title"
                  content={announcement.title}
                  style={{ color: "white" }}
                />
                <p>{format(announcement.date, "eeee do MMMM")}</p>
                <p className="hostedby">
  Hosted by <Link to={`/profile/${host.username}`}> <strong>{host.displayName}</strong></Link>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        {announcement.isHost ? (
          <Button className="edit-an"
            as={Link}
            to={`/manage/${announcement.id}`}
            floated="right"
          >
            Edit
          </Button>
        ) : announcement.isGoing ? (
          <Button className="not-interested" loading={loading} onClick={cancelAttendance}>Not Interested</Button>
        ) : (
          <Button className="edit-an" loading={loading} onClick={attendAnnouncement}>Attend</Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default observer(AnnouncementDetailedHeader);
