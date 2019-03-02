import React, { Component } from 'react';
import { withAuth } from '../AuthProvider';
import auth from '../../lib/auth-service';

class Profile extends Component {
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
    console.log('ohaoha',this.props.contact)
    this.props.contact.firstName = this.state.contact.firstName;
    this.props.contact.lastName = this.state.contact.lastName;
    this.props.contact.email = this.state.contact.email;
    this.props.contact.address = this.state.contact.address;
    this.props.contact.phone = this.state.contact.phone;
  }

  handleUpdateContact = () => {
    const { contact } = this.state;
    const { user } = this.props;
    auth.updateUser(contact, user)
      .then((data) => {
      })
  }

  fetchUserInfo = () => {
    console.log('holaholahola',this.state.contact)
    auth.gutUser()
      .then(({contact}) => {
        console.log('IMHERE',this.props.contact)
        this.setState({
          contact: contact,
        })
        // this.props.contact.firstName = contact.firstName;
        // this.props.contact.lastName = contact.lastName;
        // this.props.contact.email = contact.email;
        // this.props.contact.address = contact.address;
        // this.props.contact.phone = contact.phone;
      })
    .then(() => {
      this.setState({
        // contact: {...this.state.contact, phone: event.target.value},
      })
    })
  }

  componentWillMount() {
    this.fetchUserInfo();
  }

  render() {
    const { firstName, lastName, email, address, phone } = this.state.contact;
    const { selectedTab } = this.props;
    console.log('renderrrr',this.state.contact)
    return (
      <div className="title-container">
        <h3>{selectedTab}</h3>
        <h4>First Name</h4>
        <input type="text" value={firstName} onChange={this.handleFirstNameInput}/>
        <h4>Last Name</h4>
        <input type="text" value={lastName} onChange={this.handleLastNameInput}/>
        <h4>Email</h4>
        <input type="text" value={email} onChange={this.handleEmailInput}/>
        <h4>Address</h4>
        <input type="text" value={address} onChange={this.handleAddressInput}/>
        <h4>Phone</h4>
        <input type="text" value={phone} onChange={this.handlePhoneInput}/>
        <button onClick={this.handleUpdateContact}>Save</button>
      </div>
    )
  }
}

export default withAuth()(Profile);
