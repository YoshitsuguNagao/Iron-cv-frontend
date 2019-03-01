import React, { Component } from 'react'
import CvList from '../components/CvList';
import './Home.css';
import cv from '../lib/cv-service';
import { withAuth } from '../components/AuthProvider';
import EditCvList from '../components/EditCvList'


class Home extends Component {
  state = {
    cvList: [],
    editIndex: '',
  }

  handleCreateCV = () => {
    cv.createCv({name:'My resume', user: this.props.user})
      .then((newCv) => {
        let newCvList = [...this.state.cvList,newCv];
        this.setState({
         cvList: newCvList,
       })
    })
  }

  handleDeleteCV = (cvItem) => {
    cv.deleteCv(cvItem._id)
    .then(() => {
      this.fetchCVs()
     })
  }

  fetchCVs = () => {
    const { user } = this.props;
    cv.getCvs(user)
      .then((cvs) => {
        this.setState({
          cvList: cvs,
        })
      })
  }

  componentDidMount(){
    this.fetchCVs();
  }

  handleEditCV = (index) => {
    this.setState({
      editIndex: index
    })
  }

  handleUpdateCV = (index, editInput) => {
    const { cvList } = this.state;
    cvList[index].name = editInput
    cv.updateCv(cvList[index])
    .then(() => {
      this.fetchCVs()
      this.setState({
        editIndex: '',
      })
     })
  }

  listCvs = () => {
    const { cvList, editIndex } = this.state;
    return (
      <div className="cv-Preview-container">
      <ul>
        {
          cvList.map((cv,index) => {
            if(editIndex !== index) {
              return <CvList
                key={index}
                cv={cv}
                index={index}
                deleteCv={this.handleDeleteCV}
                editCv={this.handleEditCV}
              />
            } else {
              return <EditCvList
                key={index}
                cv={cv}
                index={index}
                updateCv={this.handleUpdateCV}
              />
            }
            // return <CvPreview key={index} cv={cv} deletecv={this.handleDeleteCV} />
          })
        }
      </ul>
    </div>
    )
  }

  render() {
    return (
      <div className="home-container">
        <button onClick={this.handleCreateCV}>New CV</button>
        { this.listCvs() }
      </div>
    )
  }
}

export default withAuth()(Home);
