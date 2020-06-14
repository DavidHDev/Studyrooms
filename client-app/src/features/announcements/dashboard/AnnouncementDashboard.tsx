import React, { useContext, useEffect, useState } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import AnnouncementList from './AnnouncementList';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import InfiniteScroll from 'react-infinite-scroller';
import AnnouncementFilters from './AnnouncementFilters';
import AnnouncementListItemPlaceholder from './AnnouncementListItemPlaceholder';

const AnnouncementDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadAnnouncements,
    loadingInitial,
    setPage,
    page,
    totalPages
  } = rootStore.announcementStore;
  const [loadingNext, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    setPage(page + 1);
    loadAnnouncements().then(() => setLoadingNext(false));
  };

  useEffect(() => {
    loadAnnouncements();
  }, [loadAnnouncements]);

  return (
    <Grid className="dashboard-grid">
      <Grid.Column width={10} style={{marginTop: '40px'}}>
        <p className="ann-title">Recent Announcements</p>
        {loadingInitial && page === 0 ? <AnnouncementListItemPlaceholder /> : (
        <InfiniteScroll
        pageStart={0}
        loadMore={handleGetNext}
        hasMore={!loadingNext && page + 1 < totalPages}
        initialLoad={false}
      >
        <AnnouncementList />
      </InfiniteScroll>
        )}
      </Grid.Column>
      <Grid.Column width={6}>
        <AnnouncementFilters />
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(AnnouncementDashboard);
