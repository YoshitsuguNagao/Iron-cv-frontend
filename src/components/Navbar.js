import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../components/AuthProvider';

class Navbar extends Component {

  title() {
    return (
      <div className="title-logo">
        <a href="/home" className="title-link">
          <img src={require("../images/logo.png")} alt="logo"/>
          <h1><b>IRON</b> CV</h1>
        </a>
      </div>
    )
  }

  render() {
    const { isLogged, user, logout } = this.props;
    const { username } = user;
    if (isLogged) {
      return (
        <div className="navbar-css">
          {this.title()}
          <div className="nav-username">
            <p>{username}</p>
            <p className="logout" onClick={logout}>Logout</p>
          </div>
        </div>
      )
    } else {
      return (
        <div className="navbar-hidden">
          {this.title()}
          <div className="auth-link">
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Signup</Link>
          </div>
        </div>
      )
    }
  };
};

export default withAuth()(Navbar);