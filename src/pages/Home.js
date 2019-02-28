import React, { Component } from 'react'
import CvPreview from '../components/CvPreview';
import './Home.css';
import cv from '../lib/cv-service';

class Home extends Component {
  state = {
    cvs: []
  }

  handleCreateCV = () => {
    cv.createCv({name:'test2'})
      .then((data) =>{
        let cvs = data[0].cvs
       this.setState({
         cvs,
       })
      })
  }
  
  componentDidMount(){
    cv.getCvs()
      .then((cvs) => {
        console.log(cvs)
        this.setState({
          cvs
        })
      })
  }

  render() {
    const { cvs } = this.state;
    return (
      <div className="cv-list-container">
        <button onClick={this.handleCreateCV}>New CV</button>
        <div className="cv-Preview-container">
          {
            cvs.map((cv,index) => {
              return <CvPreview key={index} cv={cv} />
            })
          }

        </div>
      </div>
    )
  }
}

export default Home;
