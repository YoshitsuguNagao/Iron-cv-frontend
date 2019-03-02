import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../lib/auth-service';
import './Auth.css';

class Signup extends Component {

  state = {
    username: "",
    password: "",
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
      .catch( error => console.log(error) )
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { username, password } = this.state;
    return (
      <div >
        
          <form className="auth-container" onSubmit={this.handleFormSubmit}>
            <div className="signup-form">
              <div>
                <label>Username:</label>
                <input type="text" name="username" value={username} onChange={this.handleChange}/>
              </div>
              <div>
                <label>Password:</label>
                <input type="password" name="password" value={password} onChange={this.handleChange} />
              </div>
              <div>
                <input type="submit" value="Signup" />
              </div>
            </div>
            <div>
              <p>Already have account? 
                <Link to={"/login"}> Login</Link>
              </p>
            </div>
          </form>
        
      </div>
    )
  }
}

export default Signup;