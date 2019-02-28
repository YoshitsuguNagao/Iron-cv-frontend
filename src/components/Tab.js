import React, { Component } from 'react'
import classnames from 'classnames';
import { withAuth } from './AuthProvider';

class Tab extends Component {
  state = {
    selectedTab: '',
  }

  handleClick = () => {
    const { setTab } = this.props
    setTab(this.props.title)
    console.log(this.props.title)
  }

  render() {
    const { title, ariaSelected } = this.props;
    const className = classnames(this.props).replace(/ children/g,'').replace(/ href/g,'').replace(/ className/g,'').replace(/ title/g,'').replace(/ ariaSelected/g,'');
    return ( <a className={className}
          id={`nav-${title.toLowerCase()}-tab`}
          data-toggle="tab"
          href={`#nav-${title.toLowerCase()}`}
          role="tab"
          aria-controls={`nav-${title.toLowerCase()}`}
          aria-selected={ariaSelected}
          onClick={this.handleClick}
        >{title}</a>
    )
  }
}

export default withAuth()(Tab)
