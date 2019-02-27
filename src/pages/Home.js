import React, { Component } from 'react'
import CvPreview from '../components/CvPreview';

class Home extends Component {
  state = {
    cvs: []
  }
  handleCreateCV = () => {

  }


  render() {
    const { cvs } = this.state;
    return (
      <div>
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
