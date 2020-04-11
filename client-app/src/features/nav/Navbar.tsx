import React from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'

interface IProps {
    openCreateForm: () => void;
}


export const Navbar: React.FC<IProps> = ({openCreateForm}) => {
    return (
        <div>
    <Menu fixed="top" inverted>
        <Container>
            <Menu.Item header>
                <img style={{position: 'relative', top: '-3px', left: '-5px'}} src="/assets/sricon.png" alt="logo"/>
                StudyRooms
            </Menu.Item>
            <Menu.Item>
                Announcements
            </Menu.Item>
            <Menu.Item>
                <Button onClick={openCreateForm} positive content='Create Announcement'/>
            </Menu.Item>
        </Container>    
    </Menu>
        </div>
    )
}
