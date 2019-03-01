import React, { Component } from 'react'
import './Content.css'
import Title from './Title';
import Description from './Description';
import Term from './Term';
import { withAuth } from '../components/AuthProvider';

class Content extends Component {
  state = {
    selectedTab: '',
  }

  handleTabTitle = () => {
    const { selectedTab } = this.props;
    this.setState({
      selectedTab: selectedTab,
    })
  }

  render() {
    const { selectedTab } = this.props;

    // console.log('content.js', this.props);
    if (selectedTab === 'profile') {
      return (
        <div className="content-container">
          <h3>{selectedTab}</h3>
          <Title title={'username'}/>
          <Title title={'email'}/>
        </div>
      )
    } else if (selectedTab === 'work') {
      return (
        <div className="content-container">
          <h3>{selectedTab}</h3>
          <Title title={'position'}/>
          <Term title={'From'}/>
          <Term title={'To'}/>
          <Description />
        </div>
      )
    } else if (selectedTab === 'education') {
      return (
        <div className="content-container">
          <h3>{selectedTab}</h3>
          {/* <DegreeTitle />
          <AcademicInstitution /> */}
          <Term title={'From'}/>
          <Term title={'To'}/>
          <Description />
        </div>
      )
    } else if (selectedTab === 'skills') {
      return (
        <div className="content-container">
          <h3>{selectedTab}</h3>
          <Title />
          <Term title={'From'}/>
          <Term title={'To'}/>
          <Description />
        </div>
      )
    } else if (selectedTab === 'languages') {
      return (
        <div className="content-container">
          <h3>{selectedTab}</h3>
          <Title />
          <Term title={'From'}/>
          <Term title={'To'}/>
          <Description />
        </div>
      )
    }
  }
}

export default withAuth()(Content);
