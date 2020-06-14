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
        <div  className="nav-grp">
        <Menu.Item className="logo" header as={NavLink} exact to="/">
          <img
            width="200px"
            src="/assets/SRWhite.png"
            alt="logo"
            style={{ marginRight: 10 }}
          />
        </Menu.Item>
        <Menu.Item className="nav-announcements" name="Announcements" as={NavLink} to="/announcements" />
        </div>
        <div className="nav-grp">
        <Menu.Item className="nav-item">
          <Button className="create-announ"
            as={NavLink}
            to="/createAnnouncement"
            positive
            content="Create Announcement"
          />
        </Menu.Item>
        {user && 
                  <Menu.Item className="nav-item" position='right'>
                    <Image avatar spaced='right' src={user.image || '/assets/user.svg'} />
                    <Dropdown pointing='top left' text={user.displayName}>
                      <Dropdown.Menu>
                        <Dropdown.Item as={Link} to={`/profile/${user.username}`} text='My profile' icon='user'/>
                        <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                      </Dropdown.Menu>
                    </Dropdown>
                  </Menu.Item>
        }
        </div>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
