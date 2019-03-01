import React, { Component } from 'react'
import CvList from '../components/CvList';
import './Home.css';
import cv from '../lib/cv-service';
import { withAuth } from '../components/AuthProvider';


class Home extends Component {
  state = {
    cvList: []
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

  render() {
    const { cvList } = this.state;
    return (
      <div className="home-container">
        <button onClick={this.handleCreateCV}>New CV</button>
        <div className="cv-Preview-container">
          <ul>
            {
              cvList.map((cv,index) => {
                return <CvList key={index} cv={cv} deletecv={this.handleDeleteCV} />
                // return <CvPreview key={index} cv={cv} deletecv={this.handleDeleteCV} />
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default withAuth()(Home);
