import React, { Component } from 'react'
import CvPreview from '../components/CvPreview';
import './Home.css';
import cv from '../lib/cv-service';

class Home extends Component {
  state = {
    cvList: []
  }

  handleCreateCV = () => {
    cv.createCv({name:'test2'})
      .then((newCv) => {
        console.log('hahaha',newCv)
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
    const cvId = '5c78d2322b2e724401e62d7a';
    cv.getCvs(cvId)
      .then((cvs) => {
        console.log('fetch',cvs)
        this.setState({
          cvList: cvs,
        })
      })
  }

  componentDidMount(){
    this.fetchCVs();
  }

  render() {
    const { cvList } = this.state;
    console.log('render',cvList)
    return (
      <div className="cv-list-container">
        <button onClick={this.handleCreateCV}>New CV</button>
        <div className="cv-Preview-container">
          {
            cvList.map((cv,index) => {
              return <CvPreview key={index} cv={cv} deletecv={this.handleDeleteCV} />
            })
          }

        </div>
      </div>
    )
  }
}

export default Home;
