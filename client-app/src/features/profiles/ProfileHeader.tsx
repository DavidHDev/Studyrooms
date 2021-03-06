import React from 'react';
import { Segment, Item, Header, Button, Grid, Statistic, Divider, Reveal } from 'semantic-ui-react';
import { IProfile } from '../../app/Models/profile';
import { observer } from 'mobx-react-lite';


interface IProps {
    profile: IProfile,
    isCurrentUser: boolean,
    loading: boolean,
    follow: (username: string) => void;
    unfollow: (username: string) => void;
}

const ProfileHeader: React.FC<IProps> = ({profile, isCurrentUser, loading, follow, unfollow}) => {
  return (
    <Segment>
      <Grid className="following-grid">
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size='small'
                src={profile.image || '/assets/user.svg'}
              />
              <Item.Content verticalAlign='middle'>
                <Header as='h1'>{profile.displayName}</Header>
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group className="flw-stats" widths={2}>
            <Statistic className="stats" label='Followers' value={profile.followersCount}/>
            <Statistic className="stats" label='Following' value={profile.followingCount}/>
          </Statistic.Group>
          <Divider/>
          {!isCurrentUser &&
          <Reveal animated='move'>
            <Reveal.Content visible style={{ width: '100%' }}>
              <Button className="flw-btn"
                fluid
                content={profile.following ? 'Following' : 'Not Following'}
              />
            </Reveal.Content>
            <Reveal.Content hidden>
              <Button className="btn-flw-hidden"
                loading={loading}
                fluid
                basic
                color={profile.following ? 'red' : 'green'}
                content={profile.following ? 'Unfollow' : 'Follow'}
                onClick={profile.following ? () => unfollow(profile.username) : () => follow(profile.username)}
              />
            </Reveal.Content>
          </Reveal> }
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(ProfileHeader);
