import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import { Header, Icon, List} from 'semantic-ui-react'


class App extends Component {
  state = {
    values: []
  }
  componentDidMount() {
    axios.get('http://localhost:5000/api/values').then(response => {
      this.setState({
        values: response.data
      });
    });
  }
  render(){
    return (
      <div className="App">
        <Header as='h2' icon textAlign='center'>
      <Icon name='users' circular />
      <Header.Content>Users</Header.Content>
    </Header>
        <List>
          {this.state.values.map((value: any) => (
            <List.Item style={{listStyle: 'none'}} key={value.id}>{value.name}</List.Item>
          ))}
        </List>
      </div>
    );
  }
}

export default App;
