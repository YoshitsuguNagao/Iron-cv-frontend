import React, { Component } from 'react'
import './Content.css'
import Description from '../Description';
import Profile from './Profile';
import EditProfile from './EditProfile';
import EditWork from './EditWork';
import { withAuth } from '../AuthProvider';
import Education from './Education';

class Content extends Component {
  state = {
    selectedTab: '',
    Tasks: 'some tasks',
    editProfile: false,
  }

  handleTabTitle = () => {
    const { selectedTab } = this.props;
    this.setState({
      selectedTab: selectedTab,
    })
  }

  handleOnChangeDescription = (eventName, value) => {
    console.log("changeDescriptionUpdate")
      this.setState({
        [eventName] : value,
      })
  }

  handleEditProfile = () => {
    this.setState({
      editProfile: !this.state.editProfile,
    })
  }

  showProfile = () => {
    const { editProfile } = this.state;
    console.log(editProfile)
    if(editProfile) {
      return <EditProfile editProfile={this.handleEditProfile}/>
    } else {
      return <Profile editProfile={this.handleEditProfile} />
    }
  }

  render() {
    const { selectedTab } = this.props;

    if (selectedTab === 'profile') {
      return (<div>{
        this.showProfile()
      }</div>)
    } else if (selectedTab === 'work') {
      return <EditWork selectedTab={selectedTab} />
    } else if (selectedTab === 'education') {
      return <Education selectedTab={selectedTab} />
    } else if (selectedTab === 'skills') {
      return (
        <div className="content-container">
          <h3>{selectedTab}</h3>
          {/* <Description description={'Hard skills'}/>
          <Description description={'Soft skills'}/> */}
        </div>
      )
    } else if (selectedTab === 'languages') {
      return (
        <div className="content-container">
          <h3>{selectedTab}</h3>
          <Description description={'languages'}/>
        </div>
      )
    }
  }
}

export default withAuth()(Content);
