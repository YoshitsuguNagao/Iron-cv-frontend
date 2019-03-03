import React, { Component } from 'react';
import { withAuth } from '../AuthProvider';
import auth from '../../lib/auth-service';

class Profile extends Component {
  state = {
    contact: this.props.contact,
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
    console.log('kjhg',this.state.contact)
    const { editProfile } = this.props;
    return (
      <div className="content-container">
        <h3>Profile</h3>
        <p>{firstName}</p>
        <p>{lastName}</p>
        <p>{email}</p>
        <p>{address}</p>
        <p>{phone}</p>
        <button onClick={() => { editProfile() }}>Edit</button>
      </div>
    )
  }
}

export default withAuth()(Profile);
