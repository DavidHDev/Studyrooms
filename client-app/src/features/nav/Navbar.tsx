import React from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'

interface IProps {
    openCreateForm: () => void;
}


export const Navbar: React.FC<IProps> = ({openCreateForm}) => {
    return (
        <div>
    <div>
        <Container className="navbar">
            <Menu.Item header>
                <img style={{width: '200px', position: 'relative', top: '-15px', left: '-5px'}} src="/assets/SRWhite.png" alt="logo"/>
            </Menu.Item>
            {/* <Menu.Item className="testing">
                Announcements
            </Menu.Item> */}
            <Menu.Item>
                <Button onClick={openCreateForm} positive content='Create Announcement'/>
            </Menu.Item>
        </Container>    
    </div>
        </div>
    )
}
