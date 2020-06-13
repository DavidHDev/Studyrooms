import { observable, action, computed, runInAction } from "mobx";
import { SyntheticEvent } from "react";
import { IAnnouncement } from "../Models/announcement";
import agent from "../api/agent";
import { history } from "../..";
import { toast } from "react-toastify";
import { RootStore } from "./rootStore";
import { setAnnouncementProps, createAttendee } from "../common/util/util";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import jwt from 'jsonwebtoken';


const LIMIT = 2;

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
  @observable target = "";
  @observable loading = false;
  @observable.ref hubConnection: HubConnection | null = null;

  @action createHubConnection = (announcementId: string) => {
    this.hubConnection = new HubConnectionBuilder()
    .withUrl('http://localhost:5000/chat', {
      accessTokenFactory: () => this.rootStore.commonStore.token!
    })
      .configureLogging(LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log(this.hubConnection!.state))
      .then(() => {
        if (this.hubConnection!.state === 'Connected') {
          this.hubConnection!.invoke('AddToGroup', announcementId);
        }
      })
      .catch(error => console.log('Error establishing connection: ', error));

    this.hubConnection.on('ReceiveComment', comment => {
      runInAction(() => {
        this.announcement!.comments.push(comment)
      })
    })

    this.hubConnection.on('Send', message => {
      toast.info(message);
    })
  };

  @action stopHubConnection = () => {
    this.hubConnection!.invoke('RemoveFromGroup', this.announcement!.id)
      .then(() => {
        this.hubConnection!.stop()
      })
      .then(() => console.log('Connection stopped'))
      .catch(err => console.log(err))
  }

  @action addComment = async (values: any) => {
    values.announcementId = this.announcement!.id;
    try {
      await this.hubConnection!.invoke('SendComment', values)
    } catch (error) {
      console.log(error);
    }
  } 

  @computed get announcementsByDate() {
    return this.groupAnnouncementsByDate(
      Array.from(this.announcementRegistry.values())
    );
  }

  groupAnnouncementsByDate(announcements: IAnnouncement[]) {
    const sortedAnnouncements = announcements.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    return Object.entries(
      sortedAnnouncements.reduce((announcements, announcement) => {
        const date = announcement.date.toISOString().split("T")[0];
        announcements[date] = announcements[date]
          ? [...announcements[date], announcement]
          : [announcement];
        return announcements;
      }, {} as { [key: string]: IAnnouncement[] })
    );
  }

  @action loadAnnouncements = async () => {
    this.loadingInitial = true;
    try {
      const announcements = await agent.Announcements.list();
      runInAction("loading announcements", () => {
        announcements.forEach((announcement) => {
          setAnnouncementProps(announcement, this.rootStore.userStore.user!);
          this.announcementRegistry.set(announcement.id, announcement);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("load announcements error", () => {
        this.loadingInitial = false;
      });
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
        runInAction("getting announcements", () => {
          setAnnouncementProps(announcement, this.rootStore.userStore.user!);
          this.announcement = announcement;
          this.announcementRegistry.set(announcement.id, announcement);
          this.loadingInitial = false;
        });
        return announcement;
      } catch (error) {
        runInAction("get announcement error", () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };

  @action clearAnnouncement = () => {
    this.announcement = null;
  };

  getAnnouncement = (id: string) => {
    return this.announcementRegistry.get(id);
  };

  @action createAnnouncement = async (announcement: IAnnouncement) => {
    this.submitting = true;
    try {
      await agent.Announcements.create(announcement);
      const attendee = createAttendee(this.rootStore.userStore.user!);
      attendee.isHost = true;
      let attendees = [];
      attendees.push(attendee);
      announcement.attendees = attendees;
      announcement.isHost = true;
      runInAction("create announcement", () => {
        this.announcementRegistry.set(announcement.id, announcement);
        this.submitting = false;
      });
      history.push(`/announcements/${announcement.id}`);
    } catch (error) {
      runInAction("create announcement error", () => {
        this.submitting = false;
      });
      toast.error("Problem submitting data");
      console.log(error.response);
    }
  };

  @action editAnnouncement = async (announcement: IAnnouncement) => {
    this.submitting = true;
    try {
      await agent.Announcements.update(announcement);
      runInAction("editing announcement", () => {
        this.announcementRegistry.set(announcement.id, announcement);
        this.announcement = announcement;
        this.submitting = false;
      });
      history.push(`/announcements/${announcement.id}`);
    } catch (error) {
      runInAction("edit announcement error", () => {
        this.submitting = false;
      });
      toast.error("Problem submitting data");
      console.log(error);
    }
  };

  @action deleteAnnouncement = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Announcements.delete(id);
      runInAction("deleting announcement", () => {
        this.announcementRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction("delete announcement error", () => {
        this.submitting = false;
        this.target = "";
      });
      console.log(error);
    }
  };

  @action attendAnnouncement = async () => {
    const attendee = createAttendee(this.rootStore.userStore.user!);
    this.loading = true;
    try {
      await agent.Announcements.attend(this.announcement!.id);
      runInAction(() => {
        if (this.announcement) {
          this.announcement.attendees.push(attendee);
          this.announcement.isGoing = true;
          this.announcementRegistry.set(
            this.announcement.id,
            this.announcement
          );
          this.loading = false;
        }
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      toast.error("Problem signing up to announcement");
    }
  };

  @action cancelAttendance = async () => {
    this.loading = true;
    try {
      await agent.Announcements.unattend(this.announcement!.id);
      runInAction(() => {
        if (this.announcement) {
          this.announcement.attendees = this.announcement.attendees.filter(
            (a) => a.username !== this.rootStore.userStore.user!.username
          );
          this.announcement.isGoing = false;
          this.announcementRegistry.set(
            this.announcement.id,
            this.announcement
          );
          this.loading = false;
        }
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      toast.error("Problem cancelling attendance");
    }
  };
}

// export default createContext(new AnnouncementStore());
