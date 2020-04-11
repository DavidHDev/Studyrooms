import React, { useState, useEffect, Fragment, SyntheticEvent } from "react";
import { Container } from "semantic-ui-react";
import { IAnnouncement } from "../Models/announcement";
import { Navbar } from "../../features/nav/Navbar";
import { AnnouncementDashboard } from "../../features/announcements/dashboard/AnnouncementDashboard";
import agent from "../api/agent";
import { LoadingComponent } from "./LoadingComponent";

const App = () => {
  const [announcements, setAnnouncements] = useState<IAnnouncement[]>([]);
  const [
    selectedAnnouncement,
    setSelectedAnnouncement,
  ] = useState<IAnnouncement | null>(null);
  const [editMode, setEditMode] = useState(false);

  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');

  const handleSelectAnnouncement = (id: string) => {
    setSelectedAnnouncement(announcements.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedAnnouncement(null);
    setEditMode(true);
  };

  const handleCreateAnnouncement = (announcement: IAnnouncement) => {
    setSubmitting(true);
    agent.Announcements.create(announcement).then(() => {
      setAnnouncements([...announcements, announcement])
      setSelectedAnnouncement(announcement);
      setEditMode(false);
    })
    .then(() => setSubmitting(false))
  }

  const handleEditAnnouncement = (announcement: IAnnouncement) => {
    setSubmitting(true);
    agent.Announcements.update(announcement).then(() => {
      setAnnouncements([...announcements.filter(a => a.id !== announcement.id), announcement])
      setSelectedAnnouncement(announcement);
      setEditMode(false);
    })
    .then(() => setSubmitting(false))
  }

  const handleDeleteAnnouncement = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name)
    agent.Announcements.delete(id).then(() => {
      setAnnouncements([...announcements.filter(a => a.id !== id)])
    })
    .then(() => setSubmitting(false))
  }

  useEffect(() => {
    agent.Announcements.list()
      .then((response) => {
        let announcements: IAnnouncement[] = [];
        response.forEach(announcement => {
          announcement.date = announcement.date.split('.')[0];
          announcements.push(announcement);
        })
        setAnnouncements(announcements);
      }).then(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent content ='Loading Announcements' />

  return (
    <Fragment>
      <Navbar openCreateForm={handleOpenCreateForm}></Navbar>
      <Container>
        <AnnouncementDashboard
          announcements={announcements}
          selectAnnouncement={handleSelectAnnouncement}
          selectedAnnouncement={selectedAnnouncement}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedAnnouncement={setSelectedAnnouncement}
          createAnnouncement={handleCreateAnnouncement}
          editAnnouncement={handleEditAnnouncement}
          deleteAnnouncement={handleDeleteAnnouncement}
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );
};

export default App;
