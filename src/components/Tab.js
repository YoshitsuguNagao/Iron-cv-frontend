import React, { Component } from 'react'

class Tab extends Component {
  render() {
    const { title } = this.props;
    return (
      <div>
        <li className="nav-item">
          <a className="nav-link active" href="#">{title}</a>
        </li>
      </div>
    )
  }
}

export default Tab
