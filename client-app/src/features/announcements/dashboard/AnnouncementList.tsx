import React, { useContext, Fragment } from 'react';
import { Item, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import AnnouncementListItem from './AnnouncementListItem';
import { RootStoreContext } from '../../../app/stores/rootStore';
import {format} from 'date-fns';

const AnnouncementList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    announcementsByDate
  } = rootStore.announcementStore;
  return (
    <Fragment>
      {announcementsByDate.map(([group, announcements]) => (
        <Fragment key={group}>
        <Label size='large' color='blue'>
          {format(group, 'eeee do MMMM')}
        </Label>
            <Item.Group divided>
              {announcements.map(announcement => (
                <AnnouncementListItem key={announcement.id} announcement={announcement}/>
              ))}
            </Item.Group>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(AnnouncementList);
