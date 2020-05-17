import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <Menu fixed="top" inverted>
      <Container className="navflex">
        <div>
        <Menu.Item className="logo" header as={NavLink} exact to="/">
          <img
            width="200px"
            src="/assets/SRWhite.png"
            alt="logo"
            style={{ marginRight: 10 }}
          />
        </Menu.Item>
        <Menu.Item name="Announcements" as={NavLink} to="/announcements" />
        </div>
        <Menu.Item>
          <Button
            as={NavLink}
            to="/createAnnouncement"
            positive
            content="Create Announcement"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
