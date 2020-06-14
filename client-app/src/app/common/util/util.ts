import { IAnnouncement, IAttendee } from "../../Models/announcement";
import { IUser } from "../../Models/user";

export const combineDateAndTime = (date: Date, time: Date) => {
    // const timeString = time.getHours() + ':' + time.getMinutes() + ':00';

    // const year = date.getFullYear();
    // const month = date.getMonth() + 1;
    // const day = date.getDate();
    // const dateString = `${year}-${month}-${day}`;
    const dateString = date.toISOString().split('T')[0];
    const timeString = time.toISOString().split('T')[1];

    return new Date(dateString + 'T' + timeString);
}

export const setAnnouncementProps = (announcement: IAnnouncement, user : IUser) => {
    announcement.date = new Date(announcement.date);
    announcement.isGoing = announcement.attendees.some(
      a => a.username === user.username
    );
    announcement.isHost = announcement.attendees.some(
      a => a.username === user.username && a.isHost
    );
    return announcement;
};

export const createAttendee = (user: IUser): IAttendee =>  {
    return {
        displayName: user.displayName,
        isHost: false,
        username: user.username,
        image: user.image!
    }
        
}