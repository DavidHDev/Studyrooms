import { observable, action, computed, runInAction } from 'mobx';
import { SyntheticEvent } from 'react';
import { IAnnouncement } from '../Models/announcement';
import agent from '../api/agent';
import { history } from '../..';
import { toast } from 'react-toastify';
import { RootStore } from './rootStore';

// configure({enforceActions: 'always'});

export default class AnnouncementStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }


  @observable announcementRegistry = new Map();
  @observable announcement: IAnnouncement | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

  @computed get announcementsByDate() {
    return this.groupAnnouncementsByDate(Array.from(this.announcementRegistry.values()))
  }

  groupAnnouncementsByDate(announcements: IAnnouncement[]) {
    const sortedAnnouncements = announcements.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    )
    return Object.entries(sortedAnnouncements.reduce((announcements, announcement) => {
      const date = announcement.date.toISOString().split('T')[0];
      announcements[date] = announcements[date] ? [...announcements[date], announcement] : [announcement];
      return announcements;
    }, {} as {[key: string]: IAnnouncement[]}));
  }

  @action loadAnnouncements = async () => {
    this.loadingInitial = true;
    try {
      const announcements = await agent.Announcements.list();
      runInAction('loading announcements', () => {
        announcements.forEach(announcement => {
          announcement.date = new Date(announcement.date);
          this.announcementRegistry.set(announcement.id, announcement);
        });
        this.loadingInitial = false;
      })
    } catch (error) {
      runInAction('load announcements error', () => {
        this.loadingInitial = false;
      })
    }
  };

  @action loadAnnouncement = async (id: string) => {
    let announcement = this.getAnnouncement(id);
    if (announcement) {
      this.announcement = announcement;
      return announcement;
    } else {
      this.loadingInitial = true;
      try {
        announcement = await agent.Announcements.details(id);
        runInAction('getting announcements',() => {
          announcement.date = new Date(announcement.date);
          this.announcement = announcement;
          this.announcementRegistry.set(announcement.id, announcement);
          this.loadingInitial = false;
        })
        return announcement;
      } catch (error) {
        runInAction('get announcement error', () => {
          this.loadingInitial = false;
        })
        console.log(error);
      }
    }
  }

  @action clearAnnouncement = () => {
    this.announcement = null;
  }

  getAnnouncement = (id: string) => {
    return this.announcementRegistry.get(id);
  }

  @action createAnnouncement = async (announcement: IAnnouncement) => {
    this.submitting = true;
    try {
      await agent.Announcements.create(announcement);
      runInAction('create announcement', () => {
        this.announcementRegistry.set(announcement.id, announcement);
        this.submitting = false;
      })
      history.push(`/announcements/${announcement.id}`)
    } catch (error) {
      runInAction('create announcement error', () => {
        this.submitting = false;
      })
      toast.error('Problem submitting data');
      console.log(error.response);
    }
  };

  @action editAnnouncement = async (announcement: IAnnouncement) => {
    this.submitting = true;
    try {
      await agent.Announcements.update(announcement);
      runInAction('editing announcement', () => {
        this.announcementRegistry.set(announcement.id, announcement);
        this.announcement = announcement;
        this.submitting = false;
      })
      history.push(`/announcements/${announcement.id}`)
    } catch (error) {
      runInAction('edit announcement error', () => {
        this.submitting = false;
      })
      toast.error('Problem submitting data');
      console.log(error);
    }
  };

  @action deleteAnnouncement = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Announcements.delete(id);
      runInAction('deleting announcement', () => {
        this.announcementRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction('delete announcement error', () => {
        this.submitting = false;
        this.target = '';
      })
      console.log(error);
    }
  }
}

// export default createContext(new AnnouncementStore());
