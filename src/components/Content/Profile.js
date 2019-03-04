import React, { Component } from 'react';
import { withAuth } from '../AuthProvider';
import auth from '../../lib/auth-service';

class Profile extends Component {
  state = {
    contact: this.props.contact,
    socialNetwork: this.props.socialNetwork,
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

  componentWillMount() {
    this.fetchUserInfo();
  }

  render() {
    const { firstName, lastName, email, address, phone } = this.state.contact;
    const { github, medium, linkedin } = this.state.socialNetwork;
    const { editProfile } = this.props;
    return (
      <article className="content-container">
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
        <button onClick={() => { editProfile() }}><i className="fas fa-edit"></i></button>
      </article>
    )
  }
}

export default withAuth()(Profile);
