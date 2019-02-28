import React, { Component } from 'react'
import './Content.css'
import Title from './Title';
import Description from './Description';
import Term from './Term';

class Content extends Component {


  render() {
    return (
      <div className="content-container">
        <Title />
        <Term title={'From'}/>
        <Term title={'To'}/>
        <Description />
      </div>
    )
  }
}

export default Content;
