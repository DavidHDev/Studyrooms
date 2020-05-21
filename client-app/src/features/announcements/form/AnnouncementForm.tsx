import React, { useState, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import {
  AnnouncementFormValues
} from "../../../app/Models/announcement";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import SelectInput from "../../../app/common/form/SelectInput";
import { category } from "../../../app/common/options/categoryOptions";
import DateInput from "../../../app/common/form/DateInput";
import { combineDateAndTime } from "../../../app/common/util/util";
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan } from 'revalidate';
import { RootStoreContext } from "../../../app/stores/rootStore";


const validate = combineValidators({
  title: isRequired({message: 'Announcement title is required'}),
  category: isRequired('Category'),
  description: composeValidators(
    isRequired('Description'),
    hasLengthGreaterThan(4)({message: 'Description needs to be at least 5 characters'})
  )(),
  location: isRequired('Location'),
  room: isRequired('Room'),
  date: isRequired('Date'),
  time: isRequired('Time')

})

interface DetailParams {
  id: string;
}

const AnnouncementForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createAnnouncement,
    editAnnouncement,
    submitting,
    loadAnnouncement,
  } = rootStore.announcementStore;

  const [announcement, setAnnouncement] = useState(
    new AnnouncementFormValues()
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadAnnouncement(match.params.id)
        .then((announcement) =>
          setAnnouncement(new AnnouncementFormValues(announcement))
        )
        .finally(() => setLoading(false));
    }
  }, [match.params.id, announcement.id, loadAnnouncement]);

  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, ...announcement } = values;
    announcement.date = dateAndTime;
    if (!announcement.id) {
      let newAnnouncement = {
        ...announcement,
        id: uuid(),
      };
      createAnnouncement(newAnnouncement);
    } else {
      editAnnouncement(announcement);
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment className="create-form" clearing>
          <FinalForm
            validate={validate}
            initialValues={announcement}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name="title"
                  placeholder="Title"
                  value={announcement.title}
                  component={TextInput}
                />
                <Field
                  id="form-textarea"
                  name="description"
                  placeholder="Description"
                  rows={3}
                  value={announcement.description}
                  component={TextAreaInput}
                />
                <Field
                  name="category"
                  placeholder="Category"
                  value={announcement.category}
                  component={SelectInput}
                  options={category}
                />

                <Form.Group widths="equal">
                  <Field
                    name="date"
                    date={true}
                    placeholder="Date"
                    value={announcement.date}
                    component={DateInput}
                  />
                  <Field
                    name="time"
                    time={true}
                    placeholder="Time"
                    value={announcement.date}
                    component={DateInput}
                  />
                </Form.Group>

                <Field
                  name="location"
                  placeholder="Location"
                  value={announcement.location}
                  component={TextInput}
                />
                <Field
                  name="room"
                  placeholder="Room"
                  value={announcement.room}
                  component={TextInput}
                />
                <Button
                  loading={submitting}
                  disabled={loading || invalid || pristine}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                />
                <Button
                  onClick={
                    announcement.id
                      ? () => history.push(`/announcements/${announcement.id}`)
                      : () => history.push("/announcements")
                  }
                  disabled={loading}
                  floated="right"
                  type="button"
                  content="Cancel"
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(AnnouncementForm);
