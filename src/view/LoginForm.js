import React from 'react';
import '../style/login.scss'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import GlobalConfig from '../config';

class LoginForm extends React.Component {

  state = {
    usrname: "",
    password: "",
    urlLogin: GlobalConfig.apiUrl + '/login',
    authenticated: false
  }

  handleOnChangeUsrName = (event) => {
    this.setState({
      usrname: event.target.value
    })
  }

  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  handleSubmit = (event) => {
    console.log('Submit username: ' + this.state.usrname + '\nPassword: ' + this.state.password);
    event.preventDefault();
    this.sendLoginRequest();
  }

  sendLoginRequest = async () => {
    console.log(this.state.urlLogin)
    axios.post(this.state.urlLogin, {
      username: this.state.usrname,
      password: this.state.password
    }, {})
      .then(res => {
        console.log('Login successfully!');
        console.log(res.data.accessToken);
        localStorage.setItem('token', res.data.accessToken);
        localStorage.setItem('userId', res.data.id);
        localStorage.setItem('tutorId', res.data.userDTO.tutorId);

        this.setState({
          authenticated: true
        })
      })
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          console.log(error);
        }

      });

  }

  render() {
    if (this.state.authenticated) {
      return <Navigate to={"/tutor"} />
    } else
      return <div>
        <div className="background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <img className="login_logo" src={require("../asset/images/logo_k_chu.png")} alt="logo" />

          {/* <label for="username">Username</label> */}
          <input
            className='top-10'
            value={this.state.usrname}
            type="text"
            onChange={(e) => this.handleOnChangeUsrName(e)}
            placeholder="Username"
            id="username" />

          {/* <label for="password">Password</label> */}
          <input
            className='top-10'
            value={this.state.password}
            type="password"
            onChange={(e) => this.handleOnChangePassword(e)}
            placeholder="Password"
            id="password" />

          <p id="login_message" className='login_message'></p>

          <input className='submitBtn' type="submit" value="Login" />

        </form>
      </div>;
  }
}


export default LoginForm;