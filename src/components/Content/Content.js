import React, { Component } from 'react'
import Description from '../Description';
import Profile from './Profile';
import EditProfile from './EditProfile';
import Item from './Item';
import EditWork from './EditWork';
import EditEdu from './EditEdu';
import EditProject from './EditProject';

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
    education: [],
    editEduIndex: '',
    newEditEdu: false,
    project: [],
    editProjectIndex: '',
    newEditProject: false,
    interests: [],
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

  fetchContentInfo = () => {
    const { cvId } = this.props.match.params;
    content.getContent(cvId)
      .then(contents => {
        let newWorkArr = [];
        let newEduArr = [];
        let newProjectArr = [];
        contents.forEach((content) => {
          if(content.contentType === 'work') {
            newWorkArr = [...newWorkArr, content];
          } else if (content.contentType === 'education') {
            newEduArr = [...newEduArr, content];
          } else if (content.contentType === 'project') {
            newProjectArr = [...newProjectArr, content];
          }
        })
        this.setState({
          work: newWorkArr,
          education: newEduArr,
          project: newProjectArr,
        })
      })
  }

  getProfile = () => {
    const { editProfile } = this.state;
    console.log('get profile',this.props.socialNetwork)
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
        this.fetchContentInfo();
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
        this.fetchContentInfo();
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
    const { education } = this.state;
    const { cvId } = this.props.match.params;
    let index = education.length
    content.createContent(this.props.education,cvId)
      .then((data) => {
        this.fetchContentInfo();
        this.setState({
          editEduIndex: index,
        })
      })
  }

  handleEditEdu = (index) => {
    this.setState({
      editEduIndex: index,
    })
  }

  handleUpdateEdu = (index) => {
    const { education } = this.state;
    content.updateContent(education[index])
    this.setState({
      editEduIndex: '',
    })
  }

  handleDeleteEdu = (index) => {
    const { education } = this.state;
    content.deleteContent(education[index])
      .then(() => {
        this.fetchContentInfo();
      })
  }

  getEdu = () => {
    const { education, editEduIndex } = this.state;
    console.log(education)
    return (<div>
        {
          education.map((content,index) => {
            if(editEduIndex === index) {
              return <EditEdu
                contentType={'education'}
                key={index}
                education={content}
                index={index}
                updateContent={this.handleUpdateEdu}/>
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

  // Project Component
  handleCreateProject = () => {
    const { project } = this.state;
    const { cvId } = this.props.match.params;
    let index = project.length
    content.createContent(this.props.project,cvId)
      .then((data) => {
        this.fetchContentInfo();
        this.setState({
          editProjectIndex: index,
        })
      })
  }

  handleEditProject = (index) => {
    this.setState({
      editProjectIndex: index,
    })
  }

  handleUpdateProject = (index) => {
    const { project } = this.state;
    content.updateContent(project[index])
    this.setState({
      editProjectIndex: '',
    })
  }

  handleDeleteProject = (index) => {
    const { project } = this.state;
    content.deleteContent(project[index])
      .then(() => {
        this.fetchContentInfo();
      })
  }
  getProject = () => {
    const { project, editProjectIndex } = this.state;
    return (<div>
        {
          project.map((content,index) => {
            if(editProjectIndex === index) {
              return <EditProject
                contentType={'project'}
                key={index}
                project={content}
                index={index}
                updateContent={this.handleUpdateProject}/>
            } else {
              return <Item
                contentType={'project'}
                key={index}
                content={content}
                index={index}
                editContent={this.handleEditProject}
                deleteContent={this.handleDeleteProject}/>
            }
         })
        }
        <button onClick={this.handleCreateProject} >New</button>
      </div>)
  }

  // Interests
  getInterests = () => {
    const { interests } = this.state;
  }

  componentWillMount() {
    this.fetchContentInfo();
  }

  render() {
    const { selectedTab } = this.props;
    // console.log('render content.js',this.state.editWorkIndex)
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
    } else if (selectedTab === 'project') {
      return this.getProject()
    } else if (selectedTab === 'languages') {
      return (
        <div className="content-container">
          <h3>{selectedTab}</h3>
          <Description description={'languages'}/>
        </div>
      )
    } else if  (selectedTab === 'interests') {
      return this.getInterests()
    }
  }
}

export default withAuth()(withRouter(Content));
