import React, { Fragment, useContext, useEffect } from 'react';
import { Segment, Header, Form, Button, Comment } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import {Form as FinalForm, Field} from 'react-final-form';
import { Link } from 'react-router-dom';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import { observer } from 'mobx-react-lite';
import {formatDistance} from 'date-fns';

const AnnouncementDetailedChat = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    createHubConnection,
    stopHubConnection,
    addComment,
    announcement
  } = rootStore.announcementStore;

  useEffect(() => {
    createHubConnection(announcement!.id);
    return () => {
      stopHubConnection();
    }
  }, [createHubConnection, stopHubConnection, announcement])

  return (
    <Fragment>
      <Segment className="chat-header"
        textAlign='center'
        attached='top'
        inverted
        style={{ border: 'none' }}
      >
        <Header>Announcement Discussion</Header>
      </Segment>
      <Segment attached>
        <Comment.Group>
          {announcement && announcement.comments && announcement.comments.map((comment) => (
          <Comment className="comment" key={comment.id}>
          <Comment.Avatar src={comment.image || '/assets/user.svg'} />
          <Comment.Content className="comment-content">
            <Comment.Author className="comment-author" as={Link} to={`/profile/${comment.username}`}>{comment.displayName}</Comment.Author>
            <Comment.Metadata className="comment-date">
              <div>{formatDistance(comment.createdAt, new Date())}</div>
            </Comment.Metadata>
            <Comment.Text className="comment-text">{comment.body}</Comment.Text>
          </Comment.Content>
        </Comment>
          ))}

          <FinalForm 
            onSubmit={addComment}
            render={({handleSubmit, submitting, form}) => (
              <Form onSubmit={() => handleSubmit()!.then(() => form.reset())}>
              <Field 
                name='body'
                component={TextAreaInput}
                rows={2}
                placeholder='Add your comment'
              />
              <Button className="send-btn"
                loading={submitting}
                content='Add Reply'
                labelPosition='left'
                icon='edit'
              />
            </Form>
            )}
          />

        </Comment.Group>
      </Segment>
    </Fragment>
  );
};

export default observer(AnnouncementDetailedChat);
