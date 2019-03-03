import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../components/AuthProvider';
import './Navbar.css'

class Navbar extends Component {
  render() {
    const { isLogged, user, logout } = this.props;
    const { username } = user;
    if (isLogged) {
      return <div className="main-navbar">
        <div className="title">
        <div>
          {/* <img src={require("../images/logo.png")} alt=""/> */}

        </div>
        <h1><b>IRON</b> CV</h1>
        </div>
        <div className="username">
          <div>
            <p>username: { username }</p>
          </div>
          <div>
            <p onClick={logout}>Logout</p>
          </div>
        </div>
      </div>
    } else {
      return <div className="navbar">
        <div className="title">
        <h1><b>IRON</b> CV</h1>
        </div>
        <div className="auth-link">
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Signup</Link>
        </div>
      </div>
    }
  }
}

export default withAuth()(Navbar);