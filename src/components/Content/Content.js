import React, { Component } from 'react'
import Description from '../Description';
import Profile from './Profile';
import EditProfile from './EditProfile';
import Work from './Work';
import EditWork from './EditWork';
import Education from './Education';

import content from '../../lib/content-service';
import { withRouter } from "react-router";
import { withAuth } from '../AuthProvider';

import './Content.css'

class Content extends Component {
  state = {
    selectedTab: '',
    Tasks: 'some tasks',
    editProfile: false,
    work: [],
    editWorkIndex: '',
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

  fatchContentInfo = () => {
    const { cvId } = this.props.match.params;
    const newContent =[]
    content.getContent(cvId)
      .then(contents => {
        this.setState({
          work: contents,
        })
      })
  }


  getProfile = () => {
    const { editProfile } = this.state;
    if(editProfile) {
      return <EditProfile editProfile={this.handleEditProfile}/>
    } else {
      return <Profile editProfile={this.handleEditProfile} />
    }
  }

  handleDeleteWork = (index) => {
    const { work } = this.state;
    content.deleteContent(work[index])
      .then(() => {
        this.fatchContentInfo();
      })
  }

  getWork = () => {
    const { work, editWorkIndex } = this.state;
    return (<div>
       {
         work.map((content,index) => {
           if(editWorkIndex === index) {
             return <EditWork
               key={index}
               work={content}
               index={index}/>
           } else {
             return <Work
               key={index}
               work={content}
               index={index}
               editContent={this.handleEditWork}
               deleteContent={this.handleDeleteWork}/>
           }
         })
       }
      </div>)
  }

  componentWillMount() {
    this.fatchContentInfo();
  }

  render() {
    const { selectedTab } = this.props;

    if (selectedTab === 'profile') {
      return this.getProfile()
    } else if (selectedTab === 'work') {
      return this.getWork()
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

export default withAuth()(withRouter(Content));
