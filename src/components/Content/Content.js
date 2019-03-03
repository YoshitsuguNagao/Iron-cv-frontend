import React, { Component } from 'react'
import Description from '../Description';
import Profile from './Profile';
import EditProfile from './EditProfile';
import Item from './Item';
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
    newEditWork: false,
    edu: [],
    editEduIndex: '',
    newEditEdu: false,
  }

  handleTabTitle = () => {
    const { selectedTab } = this.props;
    this.setState({
      selectedTab: selectedTab,
    })
  }

  handleOnChangeDescription = (eventName, value) => {
      this.setState({
        [eventName] : value,
      })
  }

  // Profile Component
  handleEditProfile = () => {
    this.setState({
      editProfile: !this.state.editProfile,
    })
  }

  fatchContentInfo = () => {
    const { cvId } = this.props.match.params;
    content.getContent(cvId)
      .then(contents => {
        let newWorkArr =[];
        let newEduArr =[];
        contents.forEach((content) => {
          if(content.contentType === 'work') {
            newWorkArr = [...newWorkArr, content];
          } else if (content.contentType === 'education') {
            newEduArr = [...newEduArr, content];
          }
        })
        this.setState({
          work: newWorkArr,
          edu: newEduArr,
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

  // Work Component
  handleCreateWork = () => {
    const { work } = this.state;
    const { cvId } = this.props.match.params;
    let index = work.length
    content.createContent(this.props.work,cvId)
      .then((data) => {
        this.fatchContentInfo();
        this.setState({
          editWorkIndex: index,
        })
      })
  }

  handleEditWork = (index) => {
    this.setState({
      editWorkIndex: index
    })
  }

  handleUpdateWork = (index) => {
    const { work } = this.state;
    content.updateContent(work[index])
    this.setState({
      editWorkIndex: '',
    })
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
    console.log(work)
    return (<div>
        {
          work.map((content,index) => {
            if(editWorkIndex === index) {
              return <EditWork
                contentType={'work'}
                key={index}
                work={content}
                index={index}
                updateContent={this.handleUpdateWork}/>
            } else {
              return <Item
                contentType={'work'}
                key={index}
                content={content}
                index={index}
                editContent={this.handleEditWork}
                deleteContent={this.handleDeleteWork}/>
            }
         })
        }
        <button onClick={this.handleCreateWork} >New</button>
      </div>)
  }

  //Education Component
  handleCreateEdu = () => {
    const { edu } = this.state;
    const { cvId } = this.props.match.params;
    let index = edu.length
    content.createContent(this.props.education,cvId)
      .then((data) => {
        this.fatchContentInfo();
        this.setState({
          editEduIndex: index,
        })
      })
  }

  getEdu = () => {
    const { edu, editEduIndex } = this.state;
    console.log(edu)
    return (<div>
        {
          edu.map((content,index) => {
            if(editEduIndex === index) {
              // return <EditWork
              //   contentType={'work'}
              //   key={index}
              //   work={content}
              //   index={index}
              //   updateContent={this.handleUpdateWork}/>
            } else {
              return <Item
                contentType={'education'}
                key={index}
                content={content}
                index={index}
                editContent={this.handleEditEdu}
                deleteContent={this.handleDeleteEdu}/>
            }
         })
        }
        <button onClick={this.handleCreateEdu} >New</button>
      </div>)
  }

  componentWillMount() {
    this.fatchContentInfo();
  }

  render() {
    const { selectedTab } = this.props;
    console.log('Im hrer',this.state.editWorkIndex)
    if (selectedTab === 'profile') {
      return this.getProfile()
    } else if (selectedTab === 'work') {
      return this.getWork()
    } else if (selectedTab === 'education') {
      return this.getEdu()
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
