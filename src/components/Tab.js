import React, { Component } from 'react'
import classnames from 'classnames';

class Tab extends Component {
  render() {
    const { title, ariaSelected } = this.props;
    const className = classnames(this.props).replace(/ children/g,'').replace(/ href/g,'').replace(/ className/g,'').replace(/ title/g,'').replace(/ ariaSelected/g,'');
    console.log(className)
    return ( <a className={className}
          id={`nav-${title.toLowerCase()}-tab`}
          data-toggle="tab"
          href={`#nav-${title.toLowerCase()}`}
          role="tab"
          aria-controls={`nav-${title.toLowerCase()}`}
          aria-selected={ariaSelected}
        >{title}</a>
    )
  }
}

export default Tab
