import React, { Component } from 'react';
import './CV.css';
import cv from '../../lib/cv-service';
import auth from '../../lib/auth-service';
import content from '../../lib/content-service';
import CvTitle from './CvTitle';
import CvProfile from './CvProfile';

class CV extends Component {
  state = {
    user: '',
  }

  fetchUserInfo = () => {
    auth.getUser()
      .then((user) => {
        this.setState({
          user: user,
        })
      })
  }

  componentWillMount() {
    this.fetchUserInfo();
  }

  render() {
    const { user } = this.state;
    if (user === '') {
      return (
        <div className="cv-component-container">
          <div className="cv-view">
            my cv
          </div>
        </div>
      )
    } else {
          return (
      <div className="cv-component-container">
        {/* <div>
          <button onClick={()=>{}}>download</button>
        </div> */}
        <div className="cv-view">
         <CvTitle user={user}/>
         <CvProfile user={user}/>
        </div>
      </div>
    )
    }

  }
}

export default CV
