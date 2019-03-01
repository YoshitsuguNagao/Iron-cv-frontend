import React, { Component } from 'react';
import { withAuth } from '../AuthProvider';
;

class Profile extends Component {
  state = {
    profile: this.props.profile,
  }

  handleFirstNameInput = (event) => {
    this.setState({
      profile: {...this.state.profile, firstNameInput: event.target.value},
    })
  }

  handleLastNameInput = (event) => {
    this.setState({
      profile: {...this.state.profile, lastNameInput: event.target.value},
    })
  }

  handleEmailInput = (event) => {
    this.setState({
      profile: {...this.state.profile, emailInput: event.target.value},
    })
  }

  handleAddressInput = (event) => {
    this.setState({
      profile: {...this.state.profile, addressInput: event.target.value},
    })
  }

  handlePhoneInput = (event) => {
    this.setState({
      profile: {...this.state.profile, phoneInput: event.target.value},
    })
  }

  componentDidUpdate() {
    this.props.profile.firstNameInput = this.state.profile.firstNameInput;
    this.props.profile.lastNameInput = this.state.profile.lastNameInput;
    this.props.profile.emailInput = this.state.profile.emailInput;
    this.props.profile.addressInput = this.state.profile.addressInput;
    this.props.profile.phoneInput = this.state.profile.phoneInput;
  }

  render() {
    const { firstNameInput, lastNameInput, emailInput, addressInput, phoneInput } = this.state.profile;
    const { selectedTab } = this.props;
    return (
      <div className="title-container">
        <h3>{selectedTab}</h3>
        <h4>First Name</h4>
        <input type="text" value={firstNameInput} onChange={this.handleFirstNameInput}/>
        <h4>Last Name</h4>
        <input type="text" value={lastNameInput} onChange={this.handleLastNameInput}/>
        <h4>Email</h4>
        <input type="text" value={emailInput} onChange={this.handleEmailInput}/>
        <h4>Address</h4>
        <input type="text" value={addressInput} onChange={this.handleAddressInput}/>
        <h4>Phone</h4>
        <input type="text" value={phoneInput} onChange={this.handlePhoneInput}/>
        <button onClick={this.handleSaveUserData}>Save</button>
      </div>
    )
  }
}

export default withAuth()(Profile);
