import React, { Component } from 'react';

class CvLanguages extends Component {
  render () {
    const { language, level } = this.props.user.languages;
    return (
      <article>
        <div>
          { language ? <div>{language}</div> : null }
        </div>
        <div>
          { level ? <div>{level}</div> : null }
        </div>
      </article>
    )

  }
}

export default CvLanguages;