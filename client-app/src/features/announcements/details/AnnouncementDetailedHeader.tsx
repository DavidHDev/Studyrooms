import React from 'react'
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
import { IAnnouncement } from '../../../app/Models/announcement';
import { observer } from 'mobx-react-lite';

const announcementImageStyle = {
  filter: 'brightness(80%)'
};

const announcementImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
};

const AnnouncementDetailedHeader: React.FC<{announcement: IAnnouncement}> = ({announcement}) => {
    return (
            <Segment.Group>
              <Segment className="basic-style" basic attached='top' style={{ padding: '0' }}>
                <Image src={`/assets/categoryImages/${announcement.category}.png`} fluid  style={announcementImageStyle}/>
                <Segment basic style={announcementImageTextStyle}>
                  <Item.Group>
                    <Item>
                      <Item.Content>
                        <Header
                          size='huge'
                          content={announcement.title}
                          style={{ color: 'white' }}
                        />
                        <p>{announcement.date}</p>
                        <p>
                          Hosted by <strong>Bob</strong>
                        </p>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Segment>
              </Segment>
              <Segment clearing attached='bottom'>
                <Button color='teal'>Attend</Button>
                <Button>Not Interested</Button>
                <Button color='orange' floated='right'>
                  Edit
                </Button>
              </Segment>
            </Segment.Group>
    )
}

export default observer(AnnouncementDetailedHeader);
