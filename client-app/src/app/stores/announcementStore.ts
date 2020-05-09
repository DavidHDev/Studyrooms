import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IAnnouncement } from '../Models/announcement';
import agent from '../api/agent';

configure({enforceActions: 'always'});

class AnnouncementStore {
    @observable announcementRegistry = new Map();
    @observable announcements: IAnnouncement[] = [];
    @observable selectedAnnouncement: IAnnouncement | undefined;
    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = false;
    @observable target = '';

    @computed get announcementsByDate() {
        return Array.from(this.announcementRegistry.values()).sort(
            (a, b) => Date.parse(a.date) - Date.parse(b.date)
        );
    }

    @action loadAnnouncements = async () => {
        this.loadingInitial = true;
        try {
            const announcements = await agent.Announcements.list();
            runInAction('loading announcements', () => {
                announcements.forEach(announcement => {
                    announcement.date = announcement.date.split('.')[0];
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

    @action createAnnouncement = async (announcement: IAnnouncement) => {
        this.submitting = true;
        try {
            await agent.Announcements.create(announcement);
            runInAction('create announcement', () => {
                this.announcementRegistry.set(announcement.id, announcement);
                this.editMode = false;
                this.submitting = false;
            })
        } catch (error) {
            runInAction('create announcement error', () => {
                this.submitting = false;
            })
            console.log(error);
        }
    };

    @action editAnnouncement = async (announcement: IAnnouncement) => {
        this.submitting = true;
        try{
            await agent.Announcements.update(announcement);
            runInAction('editing announcement', () => {
                this.announcementRegistry.set(announcement.id, announcement);
                this.selectedAnnouncement = announcement;
                this.editMode = false;
                this.submitting = false;
            })
        } catch (error) {
            runInAction('edit announcement error', () => {
                this.submitting = false;
            })
            console.log(error);
        }
    }

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

    @action openCreateForm = () => {
        this.editMode = true;
        this.selectedAnnouncement = undefined;
    };

    @action openEditForm = (id: string) => {
        this.selectedAnnouncement = this.announcementRegistry.get(id);
        this.editMode = true;
    }

    @action cancelSelectedAnnouncement = () => {
        this.selectedAnnouncement = undefined;
    }

    @action cancelFormOpen = () => {
        this.editMode = false;
    }

    @action selectAnnouncement = (id: string) => {
        this.selectedAnnouncement = this.announcementRegistry.get(id);
        this.editMode = false;
    }

}

export default createContext(new AnnouncementStore())