import React, { SyntheticEvent } from "react";
import { Grid } from "semantic-ui-react";
import { IAnnouncement } from "../../../app/Models/announcement";
import { AnnouncementList } from "./AnnouncementList";
import { AnnouncementDetails } from "../details/AnnouncementDetails";
import { AnnouncementForm } from "../form/AnnouncementForm";

interface IProps {
  announcements: IAnnouncement[];
  selectAnnouncement: (id: string) => void;
  selectedAnnouncement: IAnnouncement | null;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedAnnouncement: (announcement: IAnnouncement | null) => void;
  createAnnouncement: (announcement: IAnnouncement) => void;
  editAnnouncement: (announcement: IAnnouncement) => void;
  deleteAnnouncement: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target: string;
}

export const AnnouncementDashboard: React.FC<IProps> = ({
  announcements,
  selectAnnouncement,
  selectedAnnouncement,
  editMode,
  setEditMode,
  setSelectedAnnouncement,
  createAnnouncement,
  editAnnouncement,
  deleteAnnouncement,
  submitting,
  target
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <AnnouncementList
          announcements={announcements}
          selectAnnouncement={selectAnnouncement}
          selectedAnnouncement={selectedAnnouncement}
          deleteAnnouncement={deleteAnnouncement}
          submitting={submitting}
          target={target}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedAnnouncement && !editMode && (
          <AnnouncementDetails
            announcement={selectedAnnouncement}
            setEditMode={setEditMode}
            setSelectedAnnouncement={setSelectedAnnouncement}
          />
        )}

        {editMode && (
          <AnnouncementForm
            key={selectedAnnouncement && selectedAnnouncement.id || 0}
            setEditMode={setEditMode}
            announcement={selectedAnnouncement!}
            createAnnouncement={createAnnouncement}
            editAnnouncement={editAnnouncement}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};
