import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../lib/auth-service';


class Signup extends Component {

  state = {
    username: "",
    password: "",
    isWrong: false,
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    auth.signup({ username, password })
      .then( (user) => {
        this.setState({
            username: "",
            password: "",
        });
        this.props.setUser(user)
      })
      .catch((error) => {
        console.log('exists!', error);
        this.setState({
          isWrong: true,
        })
      });
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className="auth-container">
        <div className="border-auth-container">
          <form className="auth-form-container" onSubmit={this.handleFormSubmit}>
            <img className="logo" src={require("../images/logo.png")} alt="logo"/>

            <div className="signup-form">
              <div className="signup-input">
                <input type="text" name="username" value={username} onChange={this.handleChange} placeholder="username"/>
              </div>
              <div className="signup-input">
                <input type="password" name="password" value={password} onChange={this.handleChange} placeholder="password"/>
              </div>
              <input className="auth-button" type="submit" value="Signup" />
            </div>
            <div className="switch-auth">
              { this.state.isWrong ?
                <div className="incorrect-message">
                  <p>User already exists</p>
                </div>
              : null }
              <p>Already have account?
                <Link to={"/login"}> Login</Link>
              </p>
            </div>
          </form>
        </div>
        
      </div>
    )
  }
}

export default Signup;