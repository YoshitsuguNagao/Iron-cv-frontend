import React, { Component } from 'react'

class Tab extends Component {
  render() {
    const { title, link } = this.props;
    console.log(this.props)
    return (
      <div>
        <li className="nav-item">
          <a className="nav-link active" href={link}>{title}</a>
        </li>
      </div>
    )
  }
}

export default Tab
