import React, { useContext, Fragment } from 'react';
import { Container, Segment, Header, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';
import LoginForm from '../user/LoginForm';
import RegisterForm from '../user/RegisterForm';

const HomePage = () => {
  const token = window.localStorage.getItem('jwt');
  const rootStore = useContext(RootStoreContext);
  const {isLoggedIn, user} = rootStore.userStore;
  const { openModal } = rootStore.modalStore;
  return (
        <Segment inverted textAlign='center' vertical className='masthead' >
            <Container className="login-form" text>
                <Header as='h1' inverted>
                    <Image className="homelogo" size='massive' src='/assets/SRWhite.png' alt='logo' style={{marginBottom: 12}}/>
                </Header>
                {isLoggedIn && user && token ? (
                <Fragment>
                    <Header as='h2' inverted content={`Welcome back, ${user.displayName}`} />
                    <Button className="homebutton" as={Link} to='/announcements' size='huge' inverted>
                      View Feed
                    </Button>
                </Fragment>
                ) : (
                  <Fragment>
                  <div className="auth-buttons">
                  <Button onClick={() => openModal(<LoginForm/>)} className="homebutton" size='huge' inverted>
                  Log In
                  </Button>
                  <Button onClick={() => openModal(<RegisterForm/>)} className="homebutton" size='huge' inverted>
                  Register
                  </Button>
                  </div>
                  </Fragment>
                )}
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
