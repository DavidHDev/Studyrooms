import React, { Fragment, useContext } from 'react';
import { Menu, Header } from 'semantic-ui-react';
import { Calendar } from 'react-widgets';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';

const AnnouncementFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const { predicate, setPredicate } = rootStore.announcementStore;
  return (
    <Fragment>
      <Menu className="filter-menu" vertical size={'large'} style={{ width: '100%', marginTop: 155 }}>
        <Header icon={'filter'} attached content={'Filters'} />
        <Menu.Item
          active={predicate.size === 0}
          onClick={() => setPredicate('all', 'true')}
          color={'blue'}
          name={'all'}
          content={'All Announcements'}
        />
        <Menu.Item
          active={predicate.has('isGoing')}
          onClick={() => setPredicate('isGoing', 'true')}
          color={'blue'}
          name={'username'}
          content={"I'm Interested"}
        />
        <Menu.Item
          active={predicate.has('isHost')}
          onClick={() => setPredicate('isHost', 'true')}
          color={'blue'}
          name={'host'}
          content={"I'm Hosting"}
        />
      </Menu>
      <Header
        icon={'calendar'}
        attached
        content={'Select Date'}
      />
      <Calendar
        onChange={date => setPredicate('startDate', date!)}
        value={predicate.get('startDate') || new Date()}
      />
    </Fragment>
  );
};

export default observer(AnnouncementFilters);
