import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../components/AuthProvider';
import './Navbar.css';

class Navbar extends Component {
  render() {
    const { isLogged, user, logout } = this.props;
    const { username } = user;
    if (isLogged) {
      return <div className="navbar-css">
        <div className="title">
          <a href="/home" className="title-link"><div className="title-logo">
            <img src={require("../images/logo.png")} alt=""/>
            <h1><b>IRON</b> CV</h1>
          </div></a>
        </div>
        <div className="username">
          <div>
            <p className="username-name">{ username }</p>
          </div>
          <div>
            <p className="username-logout" onClick={logout}>Logout</p>
          </div>
        </div>
      </div>
    } else {
      return <div className="navbar-hidden">
        <div className="title">
          <a href="/home" className="title-link"><div className="title-logo">
            <img src={require("../images/logo.png")} alt=""/>
            <h1><b>IRON</b> CV</h1>
          </div></a>
        </div>
        <div className="auth-link">
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Signup</Link>
        </div>
      </div>
    }
  };
};

export default withAuth()(Navbar);