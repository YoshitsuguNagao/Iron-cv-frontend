import React, { Component } from 'react';
import { withAuth } from '../AuthProvider';
import auth from '../../lib/auth-service';
import { networkInterfaces } from 'os';

class EditProfile extends Component {
  state = {
    contact: this.props.contact,
    socialNetwork: this.props.socialNetwork
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
    const { contact, socialNetwork } = this.state;
    const { user,editProfile } = this.props;
    editProfile();
    auth.updateUser(contact, socialNetwork, user)
      .then((data) => {
      })
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
         this.props.socialNetwork.linkedin === "") {
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

  componentWillMount() {
    this.fetchUserInfo();
  }

  render() {
    const { firstName, lastName, email, address, phone, github, medium, linkedin } = this.state.contact;
    return (
      <div className="content-container">
        {/* <h3>Edit Profile</h3> */}
        <div className="profile-card">
          <i className="fas fa-user"></i>
          <div className="profile-card-name">
            <input type="text" value={firstName} onChange={this.handleFirstNameInput} placeholder="First Name" required/>
            <input type="text" value={lastName} onChange={this.handleLastNameInput} placeholder="Last Name" required/>
            {/* <input type="text" value={title} onChange={this.handleTitleInput} placeholder="Title" required/>
            <input type="text" value={summary} onChange={this.handleSummaryInput} placeholder="Summary" required/> */}
          </div>
        </div>
        <div className="profile-card">
          <i className="fas fa-envelope"></i>
          <input type="email" value={email} onChange={this.handleEmailInput} placeholder="Email" />
        </div>
        <div className="profile-card">
          <i className="fas fa-map-marker-alt"></i>
          <input type="text" value={address} onChange={this.handleAddressInput} placeholder="Address" />
        </div>
        <div className="profile-card">
          <i className="fas fa-phone"></i>
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

export default withAuth()(EditProfile);
