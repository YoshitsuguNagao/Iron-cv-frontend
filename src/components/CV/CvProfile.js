import React, { Component } from 'react'

class CvProfile extends Component {
  render() {
    const { email, address, phone } =this.props.user.contact;
    return (
      <article className="cv-profile-article">
        { email ? <div className="profile-card"><i className="fas fa-envelope"></i>{email}</div>: null }
        { phone ? <div className="profile-card"><i className="fas fa-mobile-alt"></i>{phone}</div>: null }
        { address ? <div className="profile-card"><i className="fas fa-map-marker-alt"></i>{address}</div>: null }
      </article>
    )
  }
}

export default CvProfile