import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Grid, Header, Card, Image, TabProps } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IUserAnnouncement } from '../../app/Models/profile';
import { format } from 'date-fns';
import { RootStoreContext } from '../../app/stores/rootStore';

const panes = [
  { menuItem: 'Upcoming', pane: { key: 'futureEvents' } },
  { menuItem: 'Past Announcements', pane: { key: 'pastEvents' } },
  { menuItem: 'Hosting', pane: { key: 'hosted' } }
];

const ProfileEvents = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadUserAnnouncements,
    profile,
    loadingAnnouncements,
    userAnnouncements
  } = rootStore.profileStore!;

  useEffect(() => {
    loadUserAnnouncements(profile!.username);
  }, [loadUserAnnouncements, profile]);

  const handleTabChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    data: TabProps
  ) => {
    let predicate;
    switch (data.activeIndex) {
      case 1:
        predicate = 'past';
        break;
      case 2:
        predicate = 'hosting';
        break;
      default:
        predicate = 'future';
        break;
    }
    loadUserAnnouncements(profile!.username, predicate);
  };

  return (
    <Tab.Pane loading={loadingAnnouncements}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='calendar' content={'Announcements'} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            panes={panes}
            menu={{ secondary: true, pointing: true }}
            onTabChange={(e, data) => handleTabChange(e, data)}
          />
          <br />
          <Card.Group itemsPerRow={2}>
            {userAnnouncements.map((announcement: IUserAnnouncement) => (
              <Card className="ann-profile-card"
                as={Link}
                to={`/announcements/${announcement.id}`}
                key={announcement.id}
              >
                <Image
                  src={`/assets/categoryImages/${announcement.category}.png`}
                  style={{ minHeight: 100, objectFit: 'cover' }}
                />
                <Card.Content>
                  <Card.Header textAlign='center'>{announcement.title}</Card.Header>
                  <Card.Meta textAlign='center'>
                    <div>{format(new Date(announcement.date), 'do LLL')}</div>
                    <div>{format(new Date(announcement.date), 'h:mm a')}</div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfileEvents);