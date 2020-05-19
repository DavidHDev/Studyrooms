import React from 'react';
import { Segment, Button, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='search' />
                Oops - the page you're looking for could not be found.
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/announcements' primary>
                    Return to Announcements page
                </Button>
            </Segment.Inline>
        </Segment>
    );
};

export default NotFound;