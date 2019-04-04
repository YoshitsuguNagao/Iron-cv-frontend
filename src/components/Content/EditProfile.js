import React, { Component } from 'react';
import { withAuth } from '../AuthProvider';
import { withRouter } from "react-router";

import auth from '../../lib/auth-service';
import cv from '../../lib/cv-service';

class EditProfile extends Component {
  state = {
    contact: this.props.contact,
    socialNetwork: this.props.socialNetwork,
    headline: this.props.headline,
    summary: this.props.summary,
    newCv: {},
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
    this.props.contact.firstName = this.state.contact.firstName;
    this.props.contact.lastName = this.state.contact.lastName;
    this.props.contact.email = this.state.contact.email;
    this.props.contact.address = this.state.contact.address;
    this.props.contact.phone = this.state.contact.phone;
    this.props.socialNetwork.github = this.state.socialNetwork.github;
    this.props.socialNetwork.medium = this.state.socialNetwork.medium;
    this.props.socialNetwork.linkedin = this.state.socialNetwork.linkedin;
  }

  handleUpdateContact = () => {
    const { contact, socialNetwork, headline, summary, newCv } = this.state;
    const { user, editProfile } = this.props;
    editProfile();
    const newUser = {user: {...user, contact, socialNetwork}}
    auth.updateUser(newUser.user);
    this.props.setUser(newUser.user);
    newCv.headline = headline;
    newCv.summary = summary;
    cv.updateCv(newCv);
    this.props.setCv(newCv);
  }

  fetchUserInfo = () => {
    auth.getUser()
      .then(({contact, socialNetwork}) => {
        if(this.props.contact.firstName === "" &&
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
        <div className="edit-profile-card">
          <i className="fas fa-user"></i>
          <div className="edit-profile-card-name width-full">
            <input type="text" className="width-half" value={firstName} onChange={this.handleFirstNameInput} placeholder="First Name" required/>
            <input type="text" className="width-half" value={lastName} onChange={this.handleLastNameInput} placeholder="Last Name" required/>
          </div>
        </div>
        <div className="edit-profile-card headline-card">
          <input type="text" className="width-full" value={headline} onChange={this.handleHeadlineInput} placeholder="Title/Headline"/>
        </div>
        <div className="edit-profile-card-textarea headline-card">
          <textarea id="textarea" type="text" className="width-full" value={summary} onChange={this.handleSummaryInput} placeholder="Summary"/>
        </div>
        <div className="edit-profile-card">
          <i className="fas fa-envelope"></i>
          <input type="email" className="width-full" value={email} onChange={this.handleEmailInput} placeholder="Email"/>
        </div>
        <div className="edit-profile-card">
          <i className="fas fa-map-marker-alt"></i>
          <input type="text" className="width-full" value={address} onChange={this.handleAddressInput} placeholder="Address"/>
        </div>
        <div className="edit-profile-card">
          <i className="fas fa-mobile-alt"></i>
          <input type="text" className="width-full" value={phone} onChange={this.handlePhoneInput} placeholder="Phone Number"/>
        </div>
        <div className="edit-profile-card">
          <i className="fab fa-github-square"></i>
          <input type="text" className="width-full" value={github} onChange={this.handleGithubInput} placeholder="Github" />
        </div>
        <div className="edit-profile-card">
          <i className="fab fa-medium"></i>
          <input type="text" className="width-full" value={medium} onChange={this.handleMediumInput} placeholder="Medium"/>
        </div>
        <div className="edit-profile-card">
          <i className="fab fa-linkedin"></i>
          <input type="text" className="width-full" value={linkedin} onChange={this.handleLinkedinInput} placeholder="LinkedIn"/>
        </div>
        <div className="save-profile-btn">
          <button onClick={this.handleUpdateContact}>Save</button>
        </div>
      </div>
    )
  }
}

export default withAuth()(withRouter(EditProfile));
