import React, { Component } from 'react'
import auth from '../lib/auth-service';

export const AuthContext = React.createContext(
  // authStore // default value
);

export const { Provider, Consumer }  = AuthContext.Consumer;

export const withAuth = () => (Comp) => {
  return class WithAuth extends Component {
    render() {
      return (
        <Consumer>
          {(authStore) => {
            return <Comp
              isLogged={authStore.isLogged}
              user={authStore.user}
              cv={authStore.cv}
              logout={authStore.logout}
              setUser={authStore.setUser}
              setCv={authStore.setCv}
              setTab={authStore.setTab}
              selectedTab={authStore.selectedTab} // add
              contact={authStore.contact}
              setContact={authStore.setContact}
              displayContent={authStore.displayContent}
              setDisplayContent={authStore.setDisplayContent}
              headline={authStore.headline}
              summary={authStore.summary}
              setHeadlines={authStore.setHeadlines}
              interest={authStore.interest}
              languages={authStore.languages}
              softSkill={authStore.softSkill}
              hardSkill={authStore.hardSkill}
              socialNetwork={authStore.socialNetwork} // add
              work={authStore.work} // add
              workContent={authStore.workContent}
              education={authStore.education} // add
              educationContent={authStore.educationContent}
              project={authStore.project} // add
              projectContent={authStore.projectContent}
              {...this.props} />
          }}
        </Consumer>
      )
    }
  }
}
// [{key: value}] [... {}]
export default class AuthProvider extends Component {
  state = {
    isLogged: false,
    user: {},
    cv: {},
    status: 'loading',
    selectedTab: 'profile', // add
    contact: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      phone: '',
    },
    displayContent: {},
    headline: '',
    summary: '',
    softSkill: [''],
    hardSkill: [''],
    interest: [''],
    languages: {
      language: '',
      level: '',
    },
    socialNetwork: {
      github: '',
      medium: '',
      linkedin: '',
    },
    workContent: [],
    educationContent: [],
    projectContent: [],
    work: {
      contentType: 'work',
      title: '',
      name: '',
      startDate: {
        month: '',
        year: '',
      },
      endDate: {
        month: '',
        year: '',
      },
      description: '',
      tasks: '',
    },
    education: {
      contentType: 'education',
      title: '',
      name: '',
      startDate: {
        month: '',
        year: '',
      },
      endDate: {
        month: '',
        year: '',
      },
      description: '',
      tasks: '',
    },
    project: {
      contentType: 'project',
      title: '',
      name: '',
      startDate: {
        month: '',
        year: '',
      },
      endDate: {
        month: '',
        year: '',
      },
      description: '',
      tasks: [],
    },
  }

  setTab = (tab) => {
    this.setState({
      selectedTab: tab
    })
  }

  setUser = (user) => {
    this.setState({
      isLogged: true,
      user,
    })
  }

  setCv = (cv) => {
    this.setState({
      cv,
    })
  }

  setContact = (contact) => {
    this.setState({
      contact,
    })
  }
  setDisplayContent = (displayContent) => {
    this.setState({
      displayContent,
    })
  }

  setHeadlines = (headline,summary) => {
    this.setState({
      headline,
      summary
    })
  }

  logoutUser = () =>{
    auth.logout()
      .then(() => {
        this.setState({
          isLogged: false,
          user: {},
        });
      })
      .catch( error => console.log(error))
  }

  componentDidMount() {
    auth.me()
      .then((user) => {
        this.setState({
          isLogged: true,
          user,
          status: 'loaded'
        })
      })
      .catch((error) => {
        this.setState({
          isLogged: false,
          user: {},
          status: 'loaded'
        });
      })
  }

  render() {
    const { isLogged,
            user,
            cv,
            status,
            selectedTab,
            contact,
            displayContent,
            headline,
            summary,
            interest,
            languages,
            softSkill,
            hardSkill,
            socialNetwork,
            workContent,
            educationContent,
            projectContent,
            work,
            education,
            project
          } = this.state;
    const { children } = this.props;
    switch (status) {
      case 'loading':
        return <div>Loading</div>
      default:
        return (
          <Provider value={{isLogged,
                            user,
                            cv,
                            logout: this.logoutUser,
                            setUser: this.setUser,
                            setCv: this.setCv,
                            setContact: this.setContact,
                            setHeadlines: this.setHeadlines,
                            setDisplayContent: this.setDisplayContent,
                            setTab: this.setTab,
                            selectedTab,
                            contact,
                            displayContent,
                            headline,
                            summary,
                            interest,
                            languages,
                            softSkill,
                            hardSkill,
                            socialNetwork,
                            workContent,
                            educationContent,
                            projectContent,
                            work,
                            education,
                            project
                          }}>
            {children}
          </Provider>
        );
    }
  }
}
