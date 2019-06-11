import React, { Component } from 'react'
import Profile from './Profile';
import EditProfile from './EditProfile';
import Item from './Item';
import Language from './Language';
import ListItem from './ListItem';
import EditItem from './EditItem';
import EditListItem from './EditListItem';
import EditLanguage from './EditLanguage';
import cv from '../../lib/cv-service';
import auth from '../../lib/auth-service';
import content from '../../lib/content-service';
import { withRouter } from "react-router";
import { withAuth } from '../AuthProvider';
import './Content.css';

class Content extends Component {
  state = {
    selectedTab: '',
    Tasks: 'some tasks',
    editProfile: false,
    work: [],
    editWorkIndex: '',
    newEditWork: false,
    education: [],
    editEducationIndex: '',
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
    isDisplayContent: {
      work:[],
      education:[],
      project:[],
    },
    displayContent: {
      work:[],
      education:[],
      project:[],
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
            const Contents = { work:[], education:[], project:[] };
            const isDisplayContent = { work:[], education:[], project:[] };
            const displayContent = { work:[], education:[], project:[] };
            contents.forEach((content) => {
              const { contentType } = content;
              Contents[contentType] = [...Contents[contentType], content];
              isDisplayContent[contentType][Contents[contentType].length - 1] = false;
              if(this.props.cv.contentId && this.props.cv.contentId.indexOf(content._id) >= 0) {
                isDisplayContent[contentType][Contents[contentType].length - 1] = true;
                displayContent[contentType][Contents[contentType].length-1] = content;
              }
            })
            this.setState({
              work: Contents['work'],
              education: Contents['education'],
              project: Contents['project'],
              isDisplayContent: isDisplayContent,
              displayContent,
            })
            this.props.setIsDisplayContent(isDisplayContent)
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

  handleCreate = (contentType) => {
    const { cvId } = this.props.match.params;
    let index = this.state[contentType].length;
    content.createContent(this.props[contentType],cvId)
      .then((data) => {
        this.fetchContentInfo();
        this.setState({["edit"+contentType.charAt(0).toUpperCase()+contentType.slice(1)+"Index"]: index})
      })
  }

  handleEdit = (index,contentType) => {
    this.setState({["edit"+contentType.charAt(0).toUpperCase()+contentType.slice(1)+"Index"]: index})
  }

  handleDelete = (index,contentType) => {
    content.deleteContent(this.state[contentType][index])
      .then(() => {
        this.fetchContentInfo();
      })
  }

  handleUpdate = (index,contentType) => {
    content.updateContent(this.state[contentType][index])
      .then(() => {
        this.fetchContentInfo();
      })
      this.setState({["edit"+contentType.charAt(0).toUpperCase()+contentType.slice(1)+"Index"]: ''})
  }

  handleUpdateDisplay = (contentType) => {
    const newCv =this.props.cv;
    // newCv.contentId = [];
    if(this.props.displayContent[contentType]) {
      this.props.displayContent[contentType].forEach((item) => {
        newCv.contentId = [...newCv.contentId,item._id];
      })
    }
    cv.updateCv(newCv);
  }

  handleDisplay = (index,contentType) => {
    const { isDisplayContent } = this.state;
    isDisplayContent[contentType][index] = !isDisplayContent[contentType][index];
    let newObj = isDisplayContent;
    this.setState({
      isDisplayContent: newObj,
    })
    this.props.setCv(this.props.cv);
    this.props.setDisplayContent(this.props.displayContent);
  }

  // Work Component
  handleUpWork = (index) => {
    const work = [...this.state.displayContent.work];
    const isWork = [...this.state.isDisplayContent.work];
    const { isDisplayContent,displayContent } = this.state;

    if(index !== 0) {
      const newWork = [...work];
      newWork[index - 1] = work[index];
      newWork[index] = work[index - 1];
      let newDisplayContent = [...displayContent]
      newDisplayContent.work = newWork;

      const newIsWork = [...isWork];
      newIsWork[index - 1] = isWork[index];
      newIsWork[index] = isWork[index - 1];
      let newIsDisplayContent = [...isDisplayContent]
      newIsDisplayContent.work = newIsWork

      this.setState({
        displayContent: newDisplayContent,
        isDisplayContent: newIsDisplayContent,
      })
    //   const newUser = {...this.props.user, softSkills: newSoftSkills}
    //   this.props.setUser(newUser)
  }
  }

  handleDownWork = (index) => {

  }
  showItem = ( content, index ) => {
    return (<Item
            key={index}
            content={content}
            index={index}
            isUse={this.state.isDisplayContent[content.contentType][index]}
            useContent={this.handleDisplay}
            editContent={this.handleEdit}
            deleteContent={this.handleDelete}/>)
  }

  getWork = () => {
    const { work, editWorkIndex } = this.state;
    this.props.displayContent.work = [];
    return (
      <div>
        {
          work.map((content,index) => {
            if(this.props.isDisplayContent.work[index]) this.props.displayContent.work = [...this.props.displayContent.work,content];
            if(editWorkIndex === index) {
              return <EditItem
                contentType={'work'}
                key={index}
                work={content}
                index={index}
                updateContent={this.handleUpdate}/>
            } else {
              return this.showItem(content,index)
            }
          })
        }
        <div className="add-profile-btn">
          <button onClick={() => {this.handleCreate('work')}}>Add</button>
        </div>
        {this.handleUpdateDisplay('work')}
      </div>
    )
  }

  //Education Component
  getEducation = () => {
    const { education, editEducationIndex } = this.state;
    this.props.displayContent.education = [];
    return (
      <div>
        {
          education.map((content,index) => {
            if(this.props.isDisplayContent.education[index]) this.props.displayContent.education = [...this.props.displayContent.education,content]
            if(editEducationIndex === index) {
              return <EditItem
                contentType={'education'}
                key={index}
                education={content}
                index={index}
                updateContent={this.handleUpdate}/>
            } else {
              return this.showItem(content,index)
            }
         })
        }
        <div className="add-profile-btn">
          <button onClick={() => {this.handleCreate('education')}} >Add</button>
        </div>
        {this.handleUpdateDisplay('education')}
      </div>
    )
  }

  // Project Component
  getProject = () => {
    const { project, editProjectIndex } = this.state;
    this.props.displayContent.project = [];
    return (
      <div>
        {
          project.map((content,index) => {
            if(this.props.isDisplayContent.project[index]) this.props.displayContent.project = [...this.props.displayContent.project,content]
            if(editProjectIndex === index) {
              return <EditItem
                contentType={'project'}
                key={index}
                project={content}
                index={index}
                updateContent={this.handleUpdate}/>
            } else {
              return this.showItem(content,index)
            }
         })
        }
        <div className="add-profile-btn">
          <button onClick={() => {this.handleCreate('project')}} >Add</button>
        </div>
        {this.handleUpdateDisplay('project')}
      </div>
    )
  }

  // Interests
  handleCreateInterest = () => {
    const { interests } = this.state;
    const newInterests = [...interests, 'interest'];
    this.updateInterestInfo(newInterests);
  }

  handleEditInterest = (index) => {
    this.setState({
      editInterestIndex: index,
    })
  }

  handleUpdateInterest = (index, editInput) => {
    const { interests } = this.state;
    const newInterests = [...interests];
    newInterests[index] = editInput;
    this.updateInterestInfo(newInterests);
  }

  handleDeleteInterest = (index) => {
    const { interests } = this.state;
    const newInterests = [...interests];
    newInterests.splice(index,1);
    this.updateInterestInfo(newInterests);
  }

  updateInterestInfo = (newInterests) => {
    const newUser = {...this.props.user, interests: newInterests}
    this.props.setUser(newUser);
    auth.updateUser(newUser)
      .then(()=>{
        this.setState({
          interests: this.props.user.interests,
          editInterestIndex: '',
        })
      })
  }

  handleUpInterest = (index) => {
    const { interests } = this.state;
    if(index !== 0) {
      const newInterests = [...interests];
      newInterests[index - 1] = interests[index]
      newInterests[index] = interests[index - 1]
      this.setState({
        interests: newInterests
      })
      const newUser = {...this.props.user, interests: newInterests}
      this.props.setUser(newUser)
      auth.updateUser(newUser)
    }
  }

  handleDownInterest = (index) => {
    const { interests } = this.state;
    if(index !== interests.length - 1) {
      const newInterests = [...interests];
      newInterests[index] = interests[index + 1]
      newInterests[index + 1] = interests[index]
      this.setState({
        interests: newInterests
      })
      const newUser = {...this.props.user, interests: newInterests}
      this.props.setUser(newUser)
      auth.updateUser(newUser)
    }
  }

  getInterests = () => {
    const { interests, editInterestIndex } = this.state;
    return (
      <article className="ineterest-list content-item-container">
        <h5>Interests</h5>
        {
          interests.map((interest,index) => {
            if (editInterestIndex === index) {
              return <EditListItem
                itemType='interest'
                setItem='setInterest'
                key={index}
                index={index}
                listContent={interest}
                updateListItem={this.handleUpdateInterest} />
            } else {
              return <ListItem
                itemType='interest'
                setItem='setInterest'
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
        <div className="add-profile-btn">
          <button onClick={this.handleCreateInterest} >Add</button>
        </div>
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
    this.props.setUser(newUser);
    auth.updateUser(newUser)
      .then(()=>{
        this.setState({
          editLanguageIndex: '',
          languages: this.props.user.languages,
        })
      })
  }

  handleUpLanguage = (index) => {
    const { languages } = this.state;
    if(index !== 0) {
      const newLanguages = [...languages];
      newLanguages[index - 1] = languages[index]
      newLanguages[index] = languages[index - 1]
      this.setState({
        languages: newLanguages
      })
      const newUser = {...this.props.user, languages: newLanguages}
      this.props.setUser(newUser)
      auth.updateUser(newUser)
    }
  }

  handleDownLanguage = (index) => {
    const { languages } = this.state;
    if(index !== languages.length - 1) {
      const newLanguages = [...languages];
      newLanguages[index] = languages[index + 1]
      newLanguages[index + 1] = languages[index]
      this.setState({
        languages: newLanguages
      })
      const newUser = {...this.props.user, languages: newLanguages}
      this.props.setUser(newUser)
      auth.updateUser(newUser)
    }
  }

  getLanguages = () => {
    const { languages, editLanguageIndex } = this.state;
    return (
      <article className="language-list content-item-container">
        <h5>Languages</h5>
        {
          languages.map((languages,index) => {
            if (editLanguageIndex === index) {
              return <EditLanguage
                itemType='language'
                key={index}
                index={index}
                listContent={languages}
                updateLanguage={this.handleUpdateLanguage}/>
            } else {
              return <Language
                key={index}
                index={index}
                listContent={languages}
                upLanguage={this.handleUpLanguage}
                downLanguage={this.handleDownLanguage}
                editLanguage={this.handleEditLanguage}
                deleteLanguage={this.handleDeleteLanguage}/>
            }
          })
        }
        <div className="add-profile-btn">
          <button onClick={this.handleCreateLanguage}>Add</button>
        </div>
      </article>
    )
  }

  // Skill
  // Soft skill
  handleCreateSoftSkill = () => {
    const { softSkills } = this.state;
    const newSoftSkills = [...softSkills, 'soft skill'];
    this.updateSoftSkillInfo(newSoftSkills);
  }

  updateSoftSkillInfo = (newSoftSkills) => {
    const newUser = {...this.props.user, softSkills: newSoftSkills}
    this.props.setUser(newUser);
    auth.updateUser(newUser)
      .then(()=>{
        this.setState({
          editSoftSkillIndex: '',
          softSkills: this.props.user.softSkills,
        })
      })
  }

  handleUpdateSoftSkill = (index, editInput) => {
    const { softSkills } = this.state;
    const newSoftSkills = [...softSkills];
    newSoftSkills[index] = editInput;
    this.updateSoftSkillInfo(newSoftSkills);
  }

  handleUpdateSkill = (index, editInput,itemType) => {
    const { softSkills } = this.state;
    const newSoftSkills = [...softSkills];
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
    const newSoftSkills = [...softSkills];
    newSoftSkills.splice(index,1);
    this.updateSoftSkillInfo(newSoftSkills);
  }

  handleUpSoftSkill = (index) => {
    const { softSkills } = this.state;
    if(index !== 0) {
      const newSoftSkills = [...softSkills];
      newSoftSkills[index - 1] = softSkills[index]
      newSoftSkills[index] = softSkills[index - 1]
      this.setState({
        softSkills: newSoftSkills
      })
      const newUser = {...this.props.user, softSkills: newSoftSkills}
      this.props.setUser(newUser)
      auth.updateUser(newUser)
    }
  }

  handleDownSoftSkill = (index) => {
    const { softSkills } = this.state;
    if(index !== softSkills.length - 1) {
      const newSoftSkills = [...softSkills];
      newSoftSkills[index] = softSkills[index + 1]
      newSoftSkills[index + 1] = softSkills[index]
      this.setState({
        softSkills: newSoftSkills
      })
      const newUser = {...this.props.user, softSkills: newSoftSkills}
      this.props.setUser(newUser)
      auth.updateUser(newUser)
    }
  }

  // hard skill
  handleCreateHardSkill = () => {
    const { hardSkills } = this.state;
    const newHardSkills = [...hardSkills, 'hard skill'];
    this.updateHardSkillInfo(newHardSkills);
  }

  updateHardSkillInfo = (newHardSkills) => {
    const newUser = {...this.props.user, hardSkills: newHardSkills}
    this.props.setUser(newUser);
    auth.updateUser(newUser)
      .then(()=>{
        this.setState({
          editHardSkillIndex: '',
          hardSkills: this.props.user.hardSkills,
        })
      })
  }

  handleUpdateHardSkill = (index, editInput) => {
    const { hardSkills } = this.state;
    const newHardSkills = [...hardSkills];
    newHardSkills[index] = editInput;
    this.updateHardSkillInfo(newHardSkills);
  }

  // handleUpdateSkill = (index, editInput) => {
  //   const { hardSkills } = this.state;
  //   const newHardSkills = [...hardSkills];
  //   newHardSkills[index] = editInput;
  //   this.updateHardSkillInfo(newHardSkills);
  // }

  handleEditHardSkill = (index) => {
    this.setState({
      editHardSkillIndex: index,
    })
  }

  handleDeleteHardSkill = (index) => {
    const { hardSkills } = this.state;
    const newHardSkills = [...hardSkills];
    newHardSkills.splice(index,1);
    this.updateHardSkillInfo(newHardSkills);
  }

  handleUpHardSkill = (index) => {
    const { hardSkills } = this.state;
    if(index !== 0) {
      const newHardSkills = [...hardSkills];
      newHardSkills[index - 1] = hardSkills[index]
      newHardSkills[index] = hardSkills[index - 1]
      this.setState({
        hardSkills: newHardSkills
      })
      const newUser = {...this.props.user, hardSkills: newHardSkills}
      this.props.setUser(newUser)
    }
  }

  handleDownHardSkill = (index) => {
    const { hardSkills } = this.state;
    if(index !== hardSkills.length - 1) {
      const newHardSkills = [...hardSkills];
      newHardSkills[index] = hardSkills[index + 1]
      newHardSkills[index + 1] = hardSkills[index]
      this.setState({
        hardSkills: newHardSkills
      })
      const newUser = {...this.props.user, hardSkills: newHardSkills}
      this.props.setUser(newUser)
    }
  }

  getSkills = () => {
    const { hardSkills, editHardSkillIndex, softSkills, editSoftSkillIndex } = this.state;
    return (
      <article className="skill-list ">
        <div className="soft-skill-container content-item-container">
          <h5>Soft Skills</h5>
          {
            // this.showListItem(softSkills,editSoftSkillIndex)
            softSkills.map((softSkill,index) => {
              if (editSoftSkillIndex === index) {
                return <EditListItem
                  itemType='softSkill'
                  setItem='setSoftSkill'
                  key={index}
                  index={index}
                  listContent={softSkill}
                  updateListItem={this.handleUpdateSoftSkill} />
              } else {
                return <ListItem
                  itemType='softSkill'
                  setItem='setSoftSkill'
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
          <div className="add-profile-btn">
            <button onClick={this.handleCreateSoftSkill} >Add</button>
          </div>
        </div>
        <div className="hard-skill-container content-item-container">
          <h5>Hard Skills</h5>
          {
            hardSkills.map((hardSkill,index) => {
              if (editHardSkillIndex === index) {
                return <EditListItem
                  itemType='hardSkill'
                  setItem='setHardSkill'
                  key={index}
                  index={index}
                  listContent={hardSkill}
                  updateListItem={this.handleUpdateHardSkill} />
              } else {
                return <ListItem
                  itemType='hardSkill'
                  setItem='setHardSkill'
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
          <div className="add-profile-btn">
            <button onClick={this.handleCreateHardSkill} >Add</button>
          </div>
        </div>
      </article>
    )
  }

  fetchUserInfo = () => {
    auth.getUser()
    .then((user) => {
      this.props.setUser(user);
      this.setState({
        interests: this.props.user.interests,
        languages: this.props.user.languages,
        softSkills: this.props.user.softSkills,
        hardSkills: this.props.user.hardSkills,
      })
    })
  }

  componentDidMount() {
    this.fetchContentInfo();
    this.fetchUserInfo();
    this.setState({
      displayContent: this.props.displayContent,
    })
    this.props.setDisplayContent(this.state.displayContent);
  }

  render() {
    const { selectedTab } = this.props;
    return this['get'+selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)]();
  }
}

export default withAuth()(withRouter(Content));
