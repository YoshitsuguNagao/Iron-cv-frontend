import React, { Component } from 'react'
import Profile from './Profile';
import EditProfile from './EditProfile';
import Item from './Item';
import Language from './Language';
import ListItem from './ListItem';
import EditWork from './EditWork';
import EditEdu from './EditEdu';
import EditProject from './EditProject';
import EditListItem from './EditListItem';
import EditLanguage from './EditLanguage';

import cv from '../../lib/cv-service';
import content from '../../lib/content-service';
import { withRouter } from "react-router";
import { withAuth } from '../AuthProvider';

import './Content.css'
import auth from '../../lib/auth-service';

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
    editInterestIndex: '',
    languages: [],
    editLanguageIndex: '',
    softSkills: [],
    editSoftSkillIndex: '',
    hardSkills: [],
    editHardSkillIndex: '',
    displayContent: {
      work:[],
      education:[],
      project:[]
    },
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
    cv.getCv(cvId)
      .then(cv => {
        this.props.setCv(cv)
      })
      .then(() => {
        content.getContent(cvId)
          .then(contents => {
            let newWorkArr = [];
            let newEduArr = [];
            let newProjectArr = [];
            const displayContent = {
              work:[],
              education:[],
              project:[],
            };
            contents.forEach((content,index) => {
              if(content.contentType === 'work') {
                newWorkArr = [...newWorkArr, content];
                displayContent.work[newWorkArr.length-1] = false
                if(this.props.cv.contentId.indexOf(content._id) >= 0)  displayContent.work[newWorkArr.length-1] = true
              } else if (content.contentType === 'education') {
                newEduArr = [...newEduArr, content];
                displayContent.education[newEduArr.length-1] = false
                if(this.props.cv.contentId.indexOf(content._id) >= 0)  displayContent.education[newEduArr.length-1] = true
              } else if (content.contentType === 'project') {
                newProjectArr = [...newProjectArr, content];
                displayContent.project[newProjectArr.length-1] = false
                if(this.props.cv.contentId.indexOf(content._id) >= 0)  displayContent.project[newProjectArr.length-1] = true
              }
            })
            this.setState({
              work: newWorkArr,
              education: newEduArr,
              project: newProjectArr,
              displayContent: displayContent,
            })
            console.log(displayContent)
            this.props.setDisplayContent(displayContent)
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

  handleDisplayWork = (index) => {
    const { displayContent } = this.state;
    displayContent.work[index] = !displayContent.work[index]
    let newObj = displayContent
    this.setState({
      displayContent: newObj,
    })
  }

  getWork = () => {
    const { work, editWorkIndex ,displayContent} = this.state;
    console.log('ahahahaha',displayContent)
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
                useContent={this.handleDisplayWork}
                editContent={this.handleEditWork}
                deleteContent={this.handleDeleteWork}/>
            }
         })
        }
        <button onClick={this.handleCreateWork} ><i className="fas fa-plus-square"></i></button>
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

  handleDisplayEdu = (index) => {
    const { displayContent } = this.state;
    displayContent.education[index] = !displayContent.education[index]
    let newObj = displayContent
    this.setState({
      displayContent: newObj,
    })
  }

  getEdu = () => {
    const { education, editEduIndex, displayContent } = this.state;
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
                useContent={this.handleDisplayEdu}
                editContent={this.handleEditEdu}
                deleteContent={this.handleDeleteEdu}/>
            }
         })
        }
        <button onClick={this.handleCreateEdu} ><i className="fas fa-plus-square"></i></button>
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

  handleDisplayProject = (index) => {
    const { displayContent } = this.state;
    displayContent.project[index] = !displayContent.project[index]
    let newObj = displayContent
    this.setState({
      displayContent: newObj,
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
                useContent={this.handleDisplayProject}
                editContent={this.handleEditProject}
                deleteContent={this.handleDeleteProject}/>
            }
         })
        }
        <button onClick={this.handleCreateProject} ><i className="fas fa-plus-square"></i></button>
      </div>)
  }

  // Interests
  handleCreateInterest = () => {
    const { interests } = this.state;
    const newInterests = [...interests, 'text2']
    this.updateInterestInfo(newInterests);
  }

  handleEditInterest = (index) => {
    this.setState({
      editInterestIndex: index,
    })
  }

  handleUpdateInterest = (index, editInput) => {
    const { interests } = this.state;
    const newInterests = [...interests]
    newInterests[index] = editInput;
    this.updateInterestInfo(newInterests);
  }

  handleDeleteInterest = (index) => {
    const { interests } = this.state;
    const newInterests = [...interests]
    newInterests.splice(index,1)
    this.updateInterestInfo(newInterests);
  }

  updateInterestInfo = (newInterests) => {
    const newUser = {...this.props.user, interests: newInterests}
    this.props.setUser(newUser)
    auth.updateUser(newUser)
      .then(()=>{
        this.setState({
          interests: this.props.user.interests,
          editInterestIndex: '',

        })
      })
  }

  getInterests = () => {
    const { interests, editInterestIndex } = this.state;
    return (
      <article className="ineterest-list">
        {
          interests.map((interest,index) => {
            if (editInterestIndex === index) {
              return <EditListItem
                itemType='interest'
                key={index}
                index={index}
                listContent={interest}
                updateListItem={this.handleUpdateInterest} />
            } else {
              return <ListItem
                itemType='interest'
                key={index}
                index={index}
                listContent={interest}
                upListItem={this.handleUpInterest}
                downListItem={this.handleDownInterest}
                editListItem={this.handleEditInterest}
                deleteListItem={this.handleDeleteInterest} />
            }
          })
        }
        <button onClick={this.handleCreateInterest} ><i className="fas fa-plus-square"></i></button>
      </article>
    )
  }

  // Languages
  handleCreateLanguage = () => {
    const { languages } = this.state;
    const newLanguages = [...languages, {language:'Japanese', level:'Native'}]
    this.updateLanguageInfo(newLanguages)
  }

  handleUpdateLanguage = (index, editLanguageInput, editLevelInput) => {
    const { languages } = this.state;
    const newLanguages = [...languages]
    newLanguages[index].language = editLanguageInput;
    newLanguages[index].level = editLevelInput;
    this.updateLanguageInfo(newLanguages)
  }

  handleEditLanguage = (index) => {
    this.setState({
      editLanguageIndex: index,
    })
  }

  handleDeleteLanguage = (index) => {
    const { languages } = this.state;
    const newLanguages = [...languages]
    newLanguages.splice(index,1)
    this.updateLanguageInfo(newLanguages)
  }

  updateLanguageInfo = (newLanguages) => {
    const newUser = {...this.props.user, languages: newLanguages}
    this.props.setUser(newUser)
    auth.updateUser(newUser)
      .then(()=>{
        this.setState({
          editLanguageIndex: '',
          languages: this.props.user.languages
        })
      })
  }

  getLanguages = () => {
    const { languages, editLanguageIndex } = this.state;
    return (
      <article className="language-list">
        {
          languages.map((languages,index) => {
            if (editLanguageIndex === index) {
              return <EditLanguage
                itemType='language'
                key={index}
                index={index}
                listContent={languages}
                updateLanguage={this.handleUpdateLanguage} />
            } else {
              return <Language
                key={index}
                index={index}
                listContent={languages}
                upLanguage={this.handleUpLanguage}
                downLanguage={this.handleDownLanguage}
                editLanguage={this.handleEditLanguage}
                deleteLanguage={this.handleDeleteLanguage} />
            }
          })
        }
        <button onClick={this.handleCreateLanguage} ><i className="fas fa-plus-square"></i></button>
      </article>
    )
  }

  // Skill
  // soft skill
  handleCreateSoftSkill = () => {
    const { softSkills } = this.state;
    const newSoftSkills = [...softSkills, 'new skill']
    this.updateSoftSkillInfo(newSoftSkills)
  }

  updateSoftSkillInfo = (newSoftSkills) => {
    const newUser = {...this.props.user, softSkills: newSoftSkills}
    this.props.setUser(newUser)
    auth.updateUser(newUser)
      .then(()=>{
        this.setState({
          editSoftSkillIndex: '',
          softSkills: this.props.user.softSkills
        })
      })
  }

  handleUpdateSoftSkill = (index, editInput) => {
    const { softSkills } = this.state;
    const newSoftSkills = [...softSkills]
    newSoftSkills[index] = editInput;
    this.updateSoftSkillInfo(newSoftSkills);
  }

  handleEditSoftSkill = (index) => {
    this.setState({
      editSoftSkillIndex: index,
    })
  }

  handleDeleteSoftSkill = (index) => {
    const { softSkills } = this.state;
    const newSoftSkills = [...softSkills]
    newSoftSkills.splice(index,1)
    this.updateSoftSkillInfo(newSoftSkills)
  }

  // hard skill
  handleCreateHardSkill = () => {
    const { hardSkills } = this.state;
    const newHardSkills = [...hardSkills, 'new skill']
    this.updateHardSkillInfo(newHardSkills)
  }

  updateHardSkillInfo = (newHardSkills) => {
    const newUser = {...this.props.user, hardSkills: newHardSkills}
    this.props.setUser(newUser)
    auth.updateUser(newUser)
      .then(()=>{
        this.setState({
          editHardSkillIndex: '',
          hardSkills: this.props.user.hardSkills
        })
      })
  }

  handleUpdateHardSkill = (index, editInput) => {
    const { hardSkills } = this.state;
    const newHardSkills = [...hardSkills]
    newHardSkills[index] = editInput;
    this.updateHardSkillInfo(newHardSkills);
  }

  handleEditHardSkill = (index) => {
    this.setState({
      editHardSkillIndex: index,
    })
  }

  handleDeleteHardSkill = (index) => {
    const { hardSkills } = this.state;
    const newHardSkills = [...hardSkills]
    newHardSkills.splice(index,1)
    this.updateHardSkillInfo(newHardSkills)
  }

  getSkill = () => {
    const { hardSkills, editHardSkillIndex, softSkills, editSoftSkillIndex } = this.state;
    return (
      <article className="skill-list">
        <div className="soft-skill-container">
          <p>Soft Skill</p>
          {
            softSkills.map((softSkill,index) => {
              if (editSoftSkillIndex === index) {
                return <EditListItem
                  itemType='softSkill'
                  key={index}
                  index={index}
                  listContent={softSkill}
                  updateListItem={this.handleUpdateSoftSkill} />
              } else {
                return <ListItem
                  itemType='softSkill'
                  key={index}
                  index={index}
                  listContent={softSkill}
                  upListItem={this.handleUpSoftSkill}
                  downListItem={this.handleDownSoftSkill}
                  editListItem={this.handleEditSoftSkill}
                  deleteListItem={this.handleDeleteSoftSkill} />
              }
            })
          }
          <button onClick={this.handleCreateSoftSkill} ><i className="fas fa-plus-square"></i></button>
        </div>
        <div className="hard-skill-container">
          <p>Hard Skill</p>
          {
            hardSkills.map((hardSkill,index) => {
              if (editHardSkillIndex === index) {
                return <EditListItem
                  itemType='hardSkill'
                  key={index}
                  index={index}
                  listContent={hardSkill}
                  updateListItem={this.handleUpdateHardSkill} />
              } else {
                return <ListItem
                  itemType='hardSkill'
                  key={index}
                  index={index}
                  listContent={hardSkill}
                  upListItem={this.handleUpHardSkill}
                  downListItem={this.handleDownHardSkill}
                  editListItem={this.handleEditHardSkill}
                  deleteListItem={this.handleDeleteHardSkill} />
              }
            })
          }
          <button onClick={this.handleCreateHardSkill} ><i className="fas fa-plus-square"></i></button>
        </div>
      </article>
    )
  }

  fetchUserInfo = () => {
    auth.getUser()
    .then((user) => {
      this.props.setUser(user)
      this.setState({
        interests: this.props.user.interests,
        languages: this.props.user.languages,
        softSkills: this.props.user.softSkills,
        hardSkills: this.props.user.hardSkills,
      })
    })
  }

  componentDidMount() {
    this.fetchContentInfo()
    this.fetchUserInfo()
  }

  render() {
    const { selectedTab } = this.props;
    if (selectedTab === 'profile') {
      return this.getProfile()
    } else if (selectedTab === 'work') {
      return this.getWork()
    } else if (selectedTab === 'education') {
      return this.getEdu()
    } else if (selectedTab === 'skills') {
      return this.getSkill()
    } else if (selectedTab === 'project') {
      return this.getProject()
    } else if (selectedTab === 'languages') {
      return this.getLanguages()
    } else if  (selectedTab === 'interests') {
      return this.getInterests()
    }
  }
}

export default withAuth()(withRouter(Content));
