import React from 'react'
import { Segment, Grid, Icon } from 'semantic-ui-react';
import { IAnnouncement } from '../../../app/Models/announcement';
import { format } from 'date-fns';

const AnnouncementDetailedInfo: React.FC<{announcement: IAnnouncement}> = ({announcement}) => {
    return (
        <div>
            <Segment.Group>
                  <Segment attached='top'>
                    <Grid>
                      <Grid.Column width={1}>
                        <Icon size='large' name='info' />
                      </Grid.Column>
                      <Grid.Column width={15}>
                        <p>{announcement.description}</p>
                      </Grid.Column>
                    </Grid>
                  </Segment>
                  <hr></hr>
                  <Segment attached>
                    <Grid verticalAlign='middle'>
                      <Grid.Column width={1}>
                        <Icon name='calendar' size='large'/>
                      </Grid.Column>
                      <Grid.Column width={15}>
                        <span>
                          {format(announcement.date, 'eeee do MMMM')} at {format(announcement.date, 'h:mm a')}
                        </span>
                      </Grid.Column>
                    </Grid>
                  </Segment>
                  <hr></hr>
                  <Segment attached>
                    <Grid verticalAlign='middle'>
                      <Grid.Column width={1}>
                        <Icon name='marker' size='large' />
                      </Grid.Column>
                      <Grid.Column width={11}>
                        <span>{announcement.location}, {announcement.room}</span>
                      </Grid.Column>
                    </Grid>
                  </Segment>
                </Segment.Group>
        </div>
    )
}

export default AnnouncementDetailedInfo;