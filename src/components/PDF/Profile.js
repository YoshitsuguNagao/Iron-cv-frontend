import React, { Component } from 'react'

class Profile extends Component {
  render() {
    const { email, address, phone } =this.props.user.contact;
    const { github, medium, linkedin } =this.props.user.socialNetwork;
    return (
      <article className="cv-profile-article">
        { email ? <div className="width-half"><i className="fas fa-envelope"></i>{email}</div>: null }
        { phone ? <div className="width-half"><i className="fas fa-mobile-alt"></i>{phone}</div>: null }
        { address ? <div className="width-half"><i className="fas fa-map-marker-alt"></i>{address}</div>: null }
        { github ? <div className="width-half"><i className="fab fa-github-square"></i>{github}</div>: null }
        { medium ? <div className="width-half"><i className="fab fa-medium"></i>{medium}</div>: null }
        { linkedin ? <div className="width-half"><i className="fab fa-linkedin"></i>{linkedin}</div>: null }
      </article>
    );
  }
};

export default Profile;
