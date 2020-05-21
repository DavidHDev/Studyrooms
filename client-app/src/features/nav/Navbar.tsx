import React, { useContext } from "react";
import { Menu, Container, Button, Image, Dropdown } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink, Link } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";

const NavBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;
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
        {user && 
                  <Menu.Item position='right'>
                    <Image avatar spaced='right' src={user.image || '/assets/user.png'} />
                    <Dropdown pointing='top left' text={user.displayName}>
                      <Dropdown.Menu>
                        <Dropdown.Item as={Link} to={`/profile/username`} text='My profile' icon='user'/>
                        <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                      </Dropdown.Menu>
                    </Dropdown>
                  </Menu.Item>
        }
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
