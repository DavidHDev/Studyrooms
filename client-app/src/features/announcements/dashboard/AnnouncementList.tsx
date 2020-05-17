import React, { useContext, Fragment } from 'react';
import { Item, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import AnnouncementStore from '../../../app/stores/announcementStore';
import AnnouncementListItem from './AnnouncementListItem';

const AnnouncementList: React.FC = () => {
  const announcementStore = useContext(AnnouncementStore);
  const {
    announcementsByDate
  } = announcementStore;
  return (
    <Fragment>
      {announcementsByDate.map(([group, announcements]) => (
        <Fragment key={group}>
        <Label size='large' color='blue'>
          {group}
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
