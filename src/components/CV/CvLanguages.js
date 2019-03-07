import React, { Component } from 'react';

class CvLanguages extends Component {
  render () {
    const { languages } =this.props.user;
    if (languages.length !== 0) {
      return (
        <article className="languages-container">
          <h4 className="cv-body-title">LANGUAGES</h4>
          <div>
            { languages.map((languageItem, index) => {
              const { language, level } = this.props.user.languages[index];
              return (
                <div className="single-language" key={index}>
                  <div>
                    {language}
                  </div>
                  <p className="p-language">
                    {level}
                  </p>
                </div>
              )
            }) }
          </div>
        </article>
      )
    } else {
      return null
    }
  }
}

export default CvLanguages;