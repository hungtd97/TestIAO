import React from 'react';
import logo from './logo.svg';
import './App.css';
import { userServices } from './service';

class App extends React.Component {
  state = {
    username: '',
    password: '',
    response: '...',
    fullname: '',
    checked: false
  }
  componentDidMount() {

  }

  handleSubmit = () => {
    let { username, password, checked } = this.state
    if (checked) {
      username = username.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-')
      password = password.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-')
    }
    console.log({ username, password })
    userServices.login(username, password).then((response) => {
      console.log('res', response)
      let { message, user, isError } = response
      if (isError) {
        this.setState({ response: `${message}`, fullname: '' })
      } else {
        this.setState({ response: message, fullname: `Full Name: ${user.name}` })
      }
    }).catch((err) => {
      console.log('erer', err)
      this.setState({ response: 'SERVER ERROR', fullname: '' })
    })
  }


  handleSubmit2 = () => {
    let { username, password, checked } = this.state
    if (checked) {
      username = username.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-')
      password = password.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-')
    }
    console.log({ username, password })
    userServices.login2(username, password).then((response) => {
      console.log('res', response)
      let { message, user, isError } = response
      if (isError) {
        this.setState({ response: `${message}`, fullname: '' })
      } else {
        this.setState({ response: message, fullname: `Full Name: ${user.name}` })
      }
    }).catch((err) => {
      console.log('erer', err)
      this.setState({ response: 'SERVER ERROR', fullname: '' })
    })
  }

  handleChangeAccount = (event) => {
    this.setState({ username: event.target.value })
  }
  handlePassword = (event) => {
    this.setState({ password: event.target.value })
  }

  handleCheckbox = () => {
    let { checked } = this.state
    this.setState({ checked: !checked })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" width="120px" />
          <h1>Test SQL Injetion</h1>
          <div class="input-box">
            <span>Username:</span>
            <input type="text" value={this.state.username} onChange={this.handleChangeAccount} required />
          </div>
          <div class="input-box">
            <span>Password:</span>
            <input type="text" value={this.state.password} onChange={this.handlePassword} required />
          </div>
          <div>Remove Special Character: <input type="checkbox" value={this.state.checkbox} checked={this.state.checked} onChange={this.handleCheckbox} /></div>

          <div class="submit-box">
            <button onClick={this.handleSubmit}>LOGIN</button>
          </div>

          <div class="submit-box">
            <button onClick={this.handleSubmit2}>LOGIN WITH PREPARED STATEMENT</button>
          </div>
          
          <div>
            <h3>Server Response</h3>
            <div class="response-box">
              <div><small>{this.state.response}</small></div>
              <div>{this.state.fullname}</div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
