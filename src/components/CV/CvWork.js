import React, { Component } from 'react'

class CvWork extends Component {
  render() {
    const { content } = this.props;
    return (
      <div>
        {content.title}
      </div>
    )
  }
}

export default CvWork;
