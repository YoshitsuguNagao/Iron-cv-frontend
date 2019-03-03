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
    // console.log('kjhg',this.state.contact)
    const { editProfile } = this.props;
    return (
      <article className="content-container">
        {/* <h3>Profile</h3> */}
        <div className="profile-card">
          <i className="fas fa-user"></i>
          <div className="content-text-container">
            <p>{firstName}</p>
          </div>
          <div className="content-text-container">
            <p>{lastName}</p>
          </div>
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
          <i className="fas fa-phone"></i>
          <p>{phone}</p>
        </div>
        <button onClick={() => { editProfile() }}><i className="fas fa-edit"></i></button>
      </article>
    )
  }
}

export default withAuth()(Profile);
