import React, { Component } from 'react';

class CvLanguages extends Component {
  render () {
    const { languages } =this.props.user;
    console.log('checking ',this.props);
    
    if (languages.length !== 0) {
      return (
        <article className="languages-container">
          <h4 className="cv-body-title">LANGUAGES</h4>
          <div>
            { languages.map((languageItem, index) => {
              console.log('finding language', languageItem);
              const { language, level } = this.props.user.languages[0];
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
    }
    

  }
}

export default CvLanguages;