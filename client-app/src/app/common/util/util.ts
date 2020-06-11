import { IAnnouncement, IAttendee } from "../../Models/announcement";
import { IUser } from "../../Models/user";
import UserStore from "../../stores/userStore";

export const combineDateAndTime = (date: Date, time: Date) => {
    const timeString = time.getHours() + ':' + time.getMinutes() + ':00';

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateString = `${year}-${month}-${day}`;

    return new Date(dateString + ' ' + timeString);
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