import React, { Component } from 'react';
import { withAuth } from '../AuthProvider';
import auth from '../../lib/auth-service';

class Profile extends Component {
  state = {
    contact: this.props.contact,
    title: this.props.title,
    summary: this.props.summary,
    socialNetwork: this.props.socialNetwork,
  }

  fetchUserInfo = () => {
    auth.getUser()
    .then((user) => {
      const { contact, title, summary, socialNetwork } = user
      if (this.props.contact.firstName === "" &&
         this.props.contact.lastName === "" &&
         this.props.contact.email === "" &&
         this.props.contact.address === "" &&
         this.props.contact.phone === "" &&
         this.props.title === "" &&
         this.props.summary === "" &&
         this.props.socialNetwork.github === "" &&
         this.props.socialNetwork.medium === "" &&
         this.props.socialNetwork.linkedin === "")
        
        {
        console.log('before',this.state.socialNetwork)

        this.setState({
          contact: contact,
          title: title,
          socialNetwork: socialNetwork,
          summary: summary,
        })
        console.log('after',this.state.socialNetwork)
      } else {
        this.setState({
          contact: this.props.contact,
          title: this.props.title,
          summary: this.props.summary,
          socialNetwork: this.props.socialNetwork,
        })
      }
    })
  }

  componentWillMount() {
    this.fetchUserInfo();
  }

  render() {
    console.log(this.props)
    const { firstName, lastName, title, summary, email, address, phone } = this.state.contact;
    const { github, medium, linkedin } = this.props.socialNetwork;
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
          <p>{title}</p>
        </div>
        <div className="profile-card">
          <p>{summary}</p>
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
        <div className="network-card">
          <i className="fab fa-github-square"></i>
          <p>{github}</p>
        </div>
        <div className="network-card">
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
