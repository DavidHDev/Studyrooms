import React, { useContext } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import AnnouncementStore from "../../app/stores/announcementStore";
import { observer } from "mobx-react-lite";

const NavBar: React.FC = () => {
  const announcementStore = useContext(AnnouncementStore);
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <img src="/assets/SRWhite.png" alt="logo" style={{ marginRight: 10 }} />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Announcements" />
        <Menu.Item>
          <Button
            onClick={announcementStore.openCreateForm}
            positive
            content="Create Announcement"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
