import React, { Component } from 'react'
import './Content.css'
// import Title from '../Title';
import Description from '../Description';
// import Term from '../Term';
import Profile from './Profile';
import Work from './Work';
import { withAuth } from '../AuthProvider';
import Education from './Education';

class Content extends Component {
  state = {
    selectedTab: '',
    Tasks: 'some tasks',
  }

  handleTabTitle = () => {
    const { selectedTab } = this.props;
    this.setState({
      selectedTab: selectedTab,
    })
  }

  // handleSaveData = () => {
  // }
  // handleSaveUserData = () => {
  //   const { user } = this.props;
  //   console.log(user)
  // }

  handleOnChangeDescription = (eventName, value) => {
    console.log("changeDescriptionUpdate")
      this.setState({
        [eventName] : value,
      })
  }

  render() {
    const { selectedTab } = this.props;

    // console.log('content.js', this.props);
    if (selectedTab === 'profile') {
      return <Profile selectedTab={selectedTab} />
    } else if (selectedTab === 'work') {
      return <Work selectedTab={selectedTab} />
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
