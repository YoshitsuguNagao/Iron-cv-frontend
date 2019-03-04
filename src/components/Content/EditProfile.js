import React, { Component } from 'react';
import { withAuth } from '../AuthProvider';
import { withRouter } from "react-router";

import auth from '../../lib/auth-service';
import cv from '../../lib/cv-service';
// import { networkInterfaces } from 'os';

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
    })
  }

  handleSummaryInput = (event) => {
    this.setState({
      summary: event.target.value,
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
    // this.props.headline = this.state.headline;
    // this.props.summary = this.state.summary;
  }

  handleUpdateContact = () => {
    const { contact, socialNetwork, headline, summary, newCv } = this.state;
    const { user, editProfile } = this.props;
    editProfile();
    auth.updateUser(contact, socialNetwork, user)
      .then((data) => {
      })
      newCv.headline = headline
      newCv.summary = summary
      console.log('cvcvcvcvcvcvvc',newCv)
      cv.updateCv(newCv)

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
      const { headline, summary } = cv
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

  componentWillMount() {
    this.fetchUserInfo();
    this.fetchCvInfo();
  }

  render() {
    const { firstName, lastName, email, address, phone } = this.state.contact;
    const { github, medium, linkedin } = this.state.socialNetwork;
    const { headline, summary } = this.state;
    return (
      <div className="content-container">
        <div className="profile-card">
          <i className="fas fa-user"></i>
          <div className="profile-card-name">
            <input type="text" value={firstName} onChange={this.handleFirstNameInput} placeholder="First Name" required/>
            <input type="text" value={lastName} onChange={this.handleLastNameInput} placeholder="Last Name" required/>
          </div>
        </div>
        <div className="profile-card">
          <input type="text" value={headline} onChange={this.handleHeadlineInput} placeholder="Title/Headline"/>
        </div>
        <textarea type="text" value={summary} onChange={this.handleSummaryInput} placeholder="Summary"/>
        <div className="profile-card">
          <i className="fas fa-envelope"></i>
          <input type="email" value={email} onChange={this.handleEmailInput} placeholder="Email" />
        </div>
        <div className="profile-card">
          <i className="fas fa-map-marker-alt"></i>
          <input type="text" value={address} onChange={this.handleAddressInput} placeholder="Address" />
        </div>
        <div className="profile-card">
          <i className="fas fa-mobile-alt"></i>
          <input type="text" value={phone} onChange={this.handlePhoneInput} placeholder="Phone Number" />
        </div>
        <div className="profile-card">
          <i className="fab fa-github-square"></i>
          <input type="text" value={github} onChange={this.handleGithubInput} placeholder="Github" />
        </div>
        <div className="profile-card">
          <i className="fab fa-medium"></i>
          <input type="text" value={medium} onChange={this.handleMediumInput} placeholder="Medium" />
        </div>
        <div className="profile-card">
          <i className="fab fa-linkedin"></i>
          <input type="text" value={linkedin} onChange={this.handleLinkedinInput} placeholder="LinkedIn" />
        </div>
        <button onClick={this.handleUpdateContact}><i className="fas fa-save"></i></button>
      </div>
    )
  }
}

export default withAuth()(withRouter(EditProfile));
