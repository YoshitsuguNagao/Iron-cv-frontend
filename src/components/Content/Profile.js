import React, { Component } from 'react';
import { withAuth } from '../AuthProvider';
import { withRouter } from "react-router"
import auth from '../../lib/auth-service';
import cv from '../../lib/cv-service';



class Profile extends Component {
  state = {
    contact: this.props.contact,
    socialNetwork: this.props.socialNetwork,
    newCv: {},
    avatarURL: '',
  }

  fetchUserInfo = () => {
    auth.getUser()
    .then(({contact, socialNetwork, avatarURL}) => {
      if (this.props.contact.firstName === "" &&
      this.props.contact.lastName === "" &&
      this.props.contact.email === "" &&
      this.props.contact.address === "" &&
      this.props.contact.phone === "" &&
      this.props.socialNetwork.github === "" &&
      this.props.socialNetwork.medium === "" &&
      this.props.socialNetwork.linkedin === ""
      ) {
        this.setState({
          contact,
          socialNetwork,
          // avatarURL,
        })
      } else {
        this.setState({
          contact: this.props.contact,
          socialNetwork: this.props.socialNetwork,
          // avatarURL: this.props.avatarURL,
        })
      }
    })
  }


  fetchCvInfo = () => {
    const { cvId } = this.props.match.params;
    cv.getCv(cvId)
      .then((cv) => {
        if(this.props.headline === '' &&
          this.props.summary === '') {
          this.setState({
            newCv: cv,
          })
        } else {
          this.setState({
            newCv: cv,
          })
        }
      })
  }

  componentDidMount() {
    this.fetchUserInfo();
    this.fetchCvInfo();
  }

  render() {
    const { firstName, lastName, email, address, phone } = this.state.contact;
    const { github, medium, linkedin } = this.state.socialNetwork;
    const { editProfile } = this.props;
    const { headline, summary } = this.props.cv;
    return (
      <article className="content-container content-item-container">
        <div className="profile-card">
          <i className="fas fa-user"></i>
          <div className="content-text-container">
            <h6>{firstName}</h6>
          </div>
          <div className="content-text-container">
            <h6>{lastName}</h6>
          </div>
        </div>
        <div className="profile-headline-container">
          <p>{headline}</p>
          <p>{summary}</p>
        </div>
        <div className="profile-card">
          <i className="fas fa-envelope"></i>
          <p>{email}</p>
        </div>
        <div className="profile-card">
          <i className="fas fa-map-marker-alt"></i>
          <p>{address}</p>
        </div>
        <div className="profile-card">
          <i className="fas fa-mobile-alt"></i>
          <p>{phone}</p>
        </div>
        <div className="profile-card">
          <i className="fab fa-github-square"></i>
          <p>{github}</p>
        </div>
        <div className="profile-card">
          <i className="fab fa-medium"></i>
          <p>{medium}</p>
        </div>
        <div className="profile-card">
          <i className="fab fa-linkedin"></i>
          <p>{linkedin}</p>
        </div>
        <div className="edit-profile-btn">
          <button onClick={() => { editProfile() }}>Edit</button>
        </div>

      </article>
    )
  }
}

export default withAuth()(withRouter(Profile));
