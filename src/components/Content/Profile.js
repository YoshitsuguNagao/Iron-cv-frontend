import React, { Component } from 'react';
import { withAuth } from '../AuthProvider';
import { withRouter } from "react-router"
import auth from '../../lib/auth-service';
import cv from '../../lib/cv-service';
// import Item from './Item';

class Profile extends Component {
  state = {
    contact: this.props.contact,
    socialNetwork: this.props.socialNetwork,
    newCv: {},
    avatarURL: '',
    // displayPic: []
  }

  fetchUserInfo = () => {
    auth.getUser()
    .then(({contact, socialNetwork, avatarURL}) => {
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
          contact,
          socialNetwork,
          // avatarURL,
        })
      } else {
        this.setState({
          contact: this.props.contact,
          socialNetwork: this.props.socialNetwork,
          // avatarURL: this.props.avatarURL,
        })
      }
    })
  }

  fetchCvInfo = () => {
    const { cvId } = this.props.match.params;
    cv.getCv(cvId)
      .then((cv) => {
        if(this.props.headline === '' &&
          this.props.summary === '') {
          this.setState({
            newCv: cv,
          })
        } else {
          this.setState({
            newCv: cv,
          })
        }
      })
  }

  // handleDisplayPicture = (index) => {
  //   const { displayPic } = this.state;
  //   displayPic.work[index] = !displayPic.work[index];
  //   let newObj = displayPic;
  //   this.setState({
  //     displayPic: newObj,
  //   })
  //   this.props.setCv(this.props.cv);
  //   this.props.setDisplayContent(this.props.displayContent);
  // }

  profileCard(title, icon) {
    return (
      <div className="profile-card">
        <div className="profile-icon">
          <i className={icon}></i>
        </div>
        <p>{title}</p>
      </div>
    )
  }

  componentDidMount() {
    this.fetchUserInfo();
    this.fetchCvInfo();
  }

  render() {
    const { firstName, lastName, email, address, phone } = this.state.contact;
    const { github, medium, linkedin } = this.state.socialNetwork;
    const { editProfile } = this.props;
    const { headline, summary } = this.props.cv;
    return (
      <article className="content-container content-item-container">
        <div className="profile-card">
          <div className="profile-icon">
            <i className="fas fa-user"></i>
          </div>
          <h6>{firstName} {lastName}</h6>
        </div>
        <div className="profile-headline-container">
          <p>{headline}</p>
          <p>{summary}</p>
        </div>
        {this.profileCard(email, "fas fa-envelope")}
        {this.profileCard(address, "fas fa-map-marker-alt")}
        {this.profileCard(phone, "fas fa-mobile-alt")}
        {this.profileCard(github, "fab fa-github-square")}
        {this.profileCard(medium, "fab fa-medium")}
        {this.profileCard(linkedin, "fab fa-linkedin")}
        {/* <div>
          <Item
            useContent={this.handleDisplayPicture}
          />
        </div> */}
        <div className="btn-container">
          <button className="blue-btn" onClick={() => { editProfile() }}>Edit</button>
        </div>

      </article>
    )
  }
}

export default withAuth()(withRouter(Profile));
