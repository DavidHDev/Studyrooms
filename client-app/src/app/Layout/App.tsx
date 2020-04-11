import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { IAnnouncement } from "../Models/announcement";
import { Navbar } from "../../features/nav/Navbar";
import { AnnouncementDashboard } from "../../features/announcements/dashboard/AnnouncementDashboard";

const App = () => {
  const [announcements, setAnnouncements] = useState<IAnnouncement[]>([]);
  const [
    selectedAnnouncement,
    setSelectedAnnouncement,
  ] = useState<IAnnouncement | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectAnnouncement = (id: string) => {
    setSelectedAnnouncement(announcements.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedAnnouncement(null);
    setEditMode(true);
  };

  const handleCreateAnnouncement = (announcement: IAnnouncement) => {
    setAnnouncements([...announcements, announcement])
    setSelectedAnnouncement(announcement);
    setEditMode(false);
  }

  const handleEditAnnouncement = (announcement: IAnnouncement) => {
    setAnnouncements([...announcements.filter(a => a.id !== announcement.id), announcement])
    setSelectedAnnouncement(announcement);
    setEditMode(false);
  }

  const handleDeleteAnnouncement = (id: string) => {
    setAnnouncements([...announcements.filter(a => a.id !== id)])
  }

  useEffect(() => {
    axios
      .get<IAnnouncement[]>("http://localhost:5000/api/announcements")
      .then((response) => {
        let announcements: IAnnouncement[] = [];
        response.data.forEach(announcement => {
          announcement.date = announcement.date.split('.')[0];
          announcements.push(announcement);
        })
        setAnnouncements(announcements);
      });
  }, []);

  return (
    <Fragment>
      <Navbar openCreateForm={handleOpenCreateForm}></Navbar>
      <Container style={{ marginTop: "7em" }}>
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
        />
      </Container>
    </Fragment>
  );
};

export default App;
