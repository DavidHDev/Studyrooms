export interface IAnnouncement {
    id: string;
    title: string;
    description: string;
    category: string;
    date: Date;
    location: string;
    room: string;
}

export interface IAnnouncementFormValues extends Partial<IAnnouncement> {
    time?: Date
}

export class AnnouncementFormValues implements IAnnouncementFormValues {
    id?: string = undefined;
    title: string = "";
    category: string = "";
    description: string = "";
    date?: Date = undefined;
    time?: Date = undefined;
    location: string = "";
    room: string = "";

    constructor(init?: IAnnouncementFormValues) {
        if (init && init.date) {
            init.time = init.date
        }
        Object.assign(this, init);
    }
}