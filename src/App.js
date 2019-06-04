import React from 'react';
import logo from './logo.svg';
import './App.css';
import { userServices } from './service';

class App extends React.Component {
  state = {
    username: '',
    password: '',
    response: '...',
    fullname: ''
  }
  componentDidMount() {

  }

  handleSubmit = () => {
    let { username, password } = this.state
    userServices.login(username, password).then((response) => {
      console.log('res', response)
      let { message, user, isError } = response
      if (isError) {
        this.setState({ response: `${message}` })
      } else {
        this.setState({ response: message, fullname: user.username })
      }
    }).catch((err) => {
      console.log('erer', err)
      this.setState({ response: 'er' })
    })
  }

  handleChangeAccount = (event) => {
    this.setState({ username: event.target.value })
  }
  handlePassword = (event) => {
    this.setState({ password: event.target.value })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <label>
            Username:
            <input type="text" value={this.state.username} onChange={this.handleChangeAccount} />
          </label>
          <label>
            Password:
            <input type="text" value={this.state.password} onChange={this.handlePassword} />
          </label>
          <div>
            <button onClick={this.handleSubmit}>LOGIN</button>
          </div>
          <div>
            <h3>Server Response</h3>
            <div>{this.state.response}</div>
            <div>{this.state.fullname}</div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
