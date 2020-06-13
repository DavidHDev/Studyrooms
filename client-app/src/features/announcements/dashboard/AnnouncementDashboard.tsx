import React, { useContext, useEffect, useState } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import AnnouncementList from './AnnouncementList';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/Layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';
import InfiniteScroll from 'react-infinite-scroller';
import AnnouncementFilters from './AnnouncementFilters';

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

  if (loadingInitial && page === 0)
    return <LoadingComponent content='Loading announcements...' />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <InfiniteScroll
          pageStart={0}
          loadMore={handleGetNext}
          hasMore={!loadingNext && page + 1 < totalPages}
          initialLoad={false}
        >
          <AnnouncementList />
        </InfiniteScroll>
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
