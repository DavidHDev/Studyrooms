import React from 'react';
import { Container, Segment, Header, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
        <Segment inverted textAlign='center' vertical className='masthead' >
            <Container className="login-form" text>
                <Header as='h1' inverted>
                    <Image className="homelogo" size='massive' src='/assets/SRWhite.png' alt='logo' style={{marginBottom: 12}}/>
                </Header>
                <Button className="homebutton" as={Link} to='/announcements' size='huge' inverted>
                    Get Started
                </Button>
            </Container>
            <div className="circle-container">
              <div className="fill-circle">
              <h2 className="branding">Learn,<br/>Teach,<br/>Share.</h2>
              </div>
              <div className="stroke-anim"></div>
            </div>
        </Segment>
  );
};

export default HomePage;
