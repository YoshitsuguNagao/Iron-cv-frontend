import React, { Component } from 'react';
import { withAuth } from '../AuthProvider';
import { withRouter } from "react-router";
import auth from '../../lib/auth-service';
import cv from '../../lib/cv-service';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';

class EditProfile extends Component {
  state = {
    contact: this.props.contact,
    socialNetwork: this.props.socialNetwork,
    headline: this.props.headline,
    summary: this.props.summary,
    newCv: {},
    avatar: '',
    isUploading: false,
    progress: 0,
    avatarURL: this.props.avatarURL,
  }

  handleFirstNameInput = (event) => {
    this.setState({
      contact: {...this.state.contact, firstName: event.target.value},
    })
  }

  handleLastNameInput = (event) => {
    this.setState({
      contact: {...this.state.contact, lastName: event.target.value},
    })
  }

  handleHeadlineInput = (event) => {
    this.setState({
      headline: event.target.value,
    },() => {
      this.props.setHeadlines(this.props.headline,this.props.summary);
    })
  }

  handleSummaryInput = (event) => {
    this.setState({
      summary: event.target.value,
    },() => {
      this.props.setHeadlines(this.state.headline,this.state.summary);
    })
  }

  handleEmailInput = (event) => {
    this.setState({
      contact: {...this.state.contact, email: event.target.value},
    })
  }

  handleAddressInput = (event) => {
    this.setState({
      contact: {...this.state.contact, address: event.target.value},
    })
  }

  handlePhoneInput = (event) => {
    this.setState({
      contact: {...this.state.contact, phone: event.target.value},
    })
  }

  handleGithubInput = (event) => {
    this.setState({
      socialNetwork: {...this.state.socialNetwork, github: event.target.value},
    })
  }

  handleMediumInput = (event) => {
    this.setState({
      socialNetwork: {...this.state.socialNetwork, medium: event.target.value},
    })
  }

  handleLinkedinInput = (event) => {
    this.setState({
      socialNetwork: {...this.state.socialNetwork, linkedin: event.target.value},
    })
  }

  componentDidUpdate() {
    if(this.props.contact !== this.state.contact) this.props.setContact(this.state.contact)
    if(this.props.socialNetwork !== this.state.socialNetwork) this.props.setSocialNetwork(this.state.socialNetwork)
    if(this.props.avatarURL !== this.state.avatarURL) this.props.setAvatarURL(this.state.avatarURL)
  }

  handleUpdateContact = () => {
    const { contact, socialNetwork, headline, summary, newCv, avatarURL } = this.state;
    const { user, editProfile } = this.props;
    editProfile();
    const newUser = {user: {...user, contact, socialNetwork, avatarURL}}
    auth.updateUser(newUser.user);
    this.props.setUser(newUser.user);
    newCv.headline = headline;
    newCv.summary = summary;
    cv.updateCv(newCv);
    this.props.setCv(newCv);
  }

  fetchUserInfo = () => {
    auth.getUser()
    .then(({contact, socialNetwork, avatarURL}) => {
      if(this.props.contact.firstName === "" &&
      this.props.contact.lastName === "" &&
      this.props.contact.email === "" &&
      this.props.contact.address === "" &&
      this.props.contact.phone === "" &&
      this.props.socialNetwork.github === "" &&
      this.props.socialNetwork.medium === "" &&
      this.props.socialNetwork.linkedin === "" &&
      this.props.avatarURL === ""
      ) {
        this.setState({
          contact,
          socialNetwork,
          avatarURL,
        })
      } else {
        this.setState({
          contact: this.props.contact,
          socialNetwork: this.props.socialNetwork,
          avatarURL: this.props.avatarURL,
        })
      }
    })
  }

  fetchCvInfo = () => {
    const { cvId } = this.props.match.params;
    cv.getCv(cvId)
    .then((cv) => {
      const { headline, summary } = cv;
      if(this.props.headline === '' &&
      this.props.summary === '') {
        this.setState({
          headline: headline,
          summary: summary,
          newCv: cv,
        })
      } else {
        this.setState({
          headline: this.props.headline,
          summary: this.props.summary,
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
  };

  handleUploadSuccess = (filename) => {
    this.setState({avatar: filename, progress: 100, isUploading: false});
    firebase
    .storage()
    .ref('images')
    .child(filename)
    .getDownloadURL()
    .then(url => {
      this.setState({avatarURL: url})
    });
  };

  componentDidMount() {
    this.fetchUserInfo();
    this.fetchCvInfo();
  }

  render() {
    const { firstName, lastName, email, address, phone } = this.state.contact;
    const { github, medium, linkedin } = this.state.socialNetwork;
    const { headline, summary } = this.state;
    return (
      <div className="content-container content-item-container">

        <div className="edit-profile-card edit-profile-title">
          <div className="profile-icon">
            <i className="fas fa-user"></i>
          </div>
          <div className="width-full">
            <div className="list-item-container">
              <div className="edit-profile-card-name width-full">
                <input type="text" className="width-full name-set" value={firstName} onChange={this.handleFirstNameInput} placeholder="First Name" required/>
                <input type="text" className="width-full name-set" value={lastName} onChange={this.handleLastNameInput} placeholder="Last Name" required/>
                <input type="text" className="width-full" value={headline} onChange={this.handleHeadlineInput} placeholder="Title/Headline"/>
              </div>
              <div className="edit-profile-upload">
                <div>
                  <label
                    className="edit-profile-choose"
                    style={{ backgroundImage: `url(${this.state.avatarURL})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}>
                    <div className="edit-profile-empty">
                      edit
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
                    </div>
                  </label>
                </div>
                {this.state.isUploading &&
                  <p>Progress: {this.state.progress}</p>
                }
              </div>
            </div>
            <textarea id="textarea" type="text" className="width-full" value={summary} onChange={this.handleSummaryInput} placeholder="Summary"/>
          </div>
        </div>
        <div className="edit-profile-card">
          <div className="profile-icon">
            <i className="fas fa-envelope"></i>
          </div>
          <input type="email" className="width-full" value={email} onChange={this.handleEmailInput} placeholder="Email"/>
        </div>
        <div className="edit-profile-card">
          <div className="profile-icon">
            <i className="fas fa-map-marker-alt"></i>
          </div>
          <input type="text" className="width-full" value={address} onChange={this.handleAddressInput} placeholder="Address"/>
        </div>
        <div className="edit-profile-card">
          <div className="profile-icon">
            <i className="fas fa-mobile-alt"></i>
          </div>
          <input type="text" className="width-full" value={phone} onChange={this.handlePhoneInput} placeholder="Phone Number"/>
        </div>
        <div className="edit-profile-card">
          <div className="profile-icon">
            <i className="fab fa-github-square"></i>
            </div>
          <input type="text" className="width-full" value={github} onChange={this.handleGithubInput} placeholder="Github" />
        </div>
        <div className="edit-profile-card">
          <div className="profile-icon">
            <i className="fab fa-medium"></i>
          </div>
          <input type="text" className="width-full" value={medium} onChange={this.handleMediumInput} placeholder="Medium"/>
        </div>
        <div className="edit-profile-card">
          <div className="profile-icon">
            <i className="fab fa-linkedin"></i>
          </div>
          <input type="text" className="width-full" value={linkedin} onChange={this.handleLinkedinInput} placeholder="LinkedIn"/>
        </div>
        <div className="btn-container">
          <button className="blue-btn" onClick={this.handleUpdateContact}>Save</button>
        </div>
      </div>
    )
  }
}

export default withAuth()(withRouter(EditProfile));
