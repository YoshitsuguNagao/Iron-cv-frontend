import React, { Component } from 'react';
import { withAuth } from '../AuthProvider';
import auth from '../../lib/auth-service';

class EditProfile extends Component {
  state = {
    contact: this.props.contact,
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

  componentDidUpdate() {
    this.props.contact.firstName = this.state.contact.firstName;
    this.props.contact.lastName = this.state.contact.lastName;
    this.props.contact.email = this.state.contact.email;
    this.props.contact.address = this.state.contact.address;
    this.props.contact.phone = this.state.contact.phone;
  }

  handleUpdateContact = () => {
    const { contact } = this.state;
    const { user,editProfile } = this.props;
    editProfile();
    auth.updateUser(contact, user)
      .then((data) => {
      })
  }

  fetchUserInfo = () => {
    auth.getUser()
    .then(({contact}) => {
      if(this.props.contact.firstName === "" &&
         this.props.contact.lastName === "" &&
         this.props.contact.email === "" &&
         this.props.contact.address === "" &&
         this.props.contact.phone === "" ) {
        this.setState({
            contact: contact,
        })
      } else {
        this.setState({
          contact: this.props.contact,
        })
      }
    })
  }

  componentWillMount() {
    this.fetchUserInfo();
  }

  render() {
    const { firstName, lastName, email, address, phone } = this.state.contact;
    return (
      <div className="content-container">
        <h3>Edit Profile</h3>
        {/* <h4>First Name</h4> */}
        <input type="text" value={firstName} onChange={this.handleFirstNameInput} placeholder="First Name" required/>
        {/* <h4>Last Name</h4> */}
        <input type="text" value={lastName} onChange={this.handleLastNameInput} placeholder="Last Name" required/>
        {/* <h4>Email</h4> */}
        <input type="email" value={email} onChange={this.handleEmailInput} placeholder="Email" />
        {/* <h4>Address</h4> */}
        <input type="text" value={address} onChange={this.handleAddressInput} placeholder="Address" />
        {/* <h4>Phone</h4> */}
        <input type="text" value={phone} onChange={this.handlePhoneInput} placeholder="Phone Number" />
        <button onClick={this.handleUpdateContact}>Save</button>
      </div>
    )
  }
}

export default withAuth()(EditProfile);
