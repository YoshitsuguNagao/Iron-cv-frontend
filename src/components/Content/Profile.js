import React, { Component } from 'react';
import { withAuth } from '../AuthProvider';
import { withRouter } from "react-router"
import auth from '../../lib/auth-service';
import cv from '../../lib/cv-service';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';

class Profile extends Component {
  state = {
    contact: this.props.contact,
    socialNetwork: this.props.socialNetwork,
    newCv: {},
    avatar: '',
    isUploading: false,
    progress: 0,
    avatarURL: '',
  }

  fetchUserInfo = () => {
    auth.getUser()
    .then(({contact, socialNetwork}) => {
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
          contact: contact,
          socialNetwork: socialNetwork,
        })
      } else {
        this.setState({
          contact: this.props.contact,
          socialNetwork: this.props.socialNetwork,
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

  handleUploadStart = () => this.setState({isUploading: true, progress: 0});
  handleProgress = (progress) => this.setState({progress});
  handleUploadError = (error) => {
  this.setState({isUploading: false});
  console.error(error);
  }
  handleUploadSuccess = (filename) => {
  this.setState({avatar: filename, progress: 100, isUploading: false});
  firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({avatarURL: url}),console.log(this.state.avatarURL));
  };
  
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
        {this.state.isUploading &&
          <p>Progress: {this.state.progress}</p>
        }
        {this.state.avatarURL &&
          <img src={this.state.avatarURL} />
        }
        <FileUploader
          accept="image/*"
          name="avatar"
          randomizeFilename
          storageRef={firebase.storage().ref('images')}
          onUploadStart={this.handleUploadStart}
          onUploadError={this.handleUploadError}
          onUploadSuccess={this.handleUploadSuccess}
          onProgress={this.handleProgress}
        />

      </article>
    )
  }
}

export default withAuth()(withRouter(Profile));
