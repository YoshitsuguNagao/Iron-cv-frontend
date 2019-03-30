import React, { Component } from 'react';
import auth from '../lib/auth-service';

export const AuthContext = React.createContext();

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
              selectedTab={authStore.selectedTab}
              contact={authStore.contact}
              setContact={authStore.setContact}
              isDisplayContent={authStore.isDisplayContent}
              displayContent={authStore.displayContent}
              setIsDisplayContent={authStore.setIsDisplayContent}
              setDisplayContent={authStore.setDisplayContent}
              headline={authStore.headline}
              summary={authStore.summary}
              setHeadlines={authStore.setHeadlines}
              interest={authStore.interest}
              // interests={authStore.interests}
              setInterest={authStore.setInterest}
              languages={authStore.languages}
              softSkill={authStore.softSkill}
              hardSkill={authStore.hardSkill}
              socialNetwork={authStore.socialNetwork}
              work={authStore.work}
              workContent={authStore.workContent}
              education={authStore.education}
              educationContent={authStore.educationContent}
              project={authStore.project}
              projectContent={authStore.projectContent}
              {...this.props} />
          }}
        </Consumer>
      );
    }
  };
};

export default class AuthProvider extends Component {
  state = {
    isLogged: false,
    user: {},
    cv: {},
    status: 'loading',
    selectedTab: 'profile',
    contact: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      phone: '',
    },
    isDisplayContent: {},
    displayContent: {
      work:[],
      education:[],
      project:[],
    },
    headline: '',
    summary: '',
    softSkill: [''],
    hardSkill: [''],
    interest: '',
    // interests: [],
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
  };

  setTab = (tab) => {
    this.setState({
      selectedTab: tab
    });
  };

  setUser = (user) => {
    this.setState({
      isLogged: true,
      user,
    });
  };

  setCv = (cv) => {
    this.setState({
      cv,
    });
  };

  setContact = (contact) => {
    this.setState({
      contact,
    });
  };

  setIsDisplayContent = (isDisplayContent) => {
    this.setState({
      isDisplayContent,
    });
  };

  setDisplayContent = (displayContent) => {
    this.setState({
      displayContent,
    });
  };

  setHeadlines = (headline,summary) => {
    this.setState({
      headline,
      summary,
    });
  };

  setInterest = (interest) => {
    this.setState({
      interest,
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
  };

  componentDidMount() {
    auth.me()
    .then((user) => {
      console.log('object')
      this.setState({
          isLogged: true,
          user,
          status: 'loaded',
        })
      })
      .catch((error) => {
        this.setState({
          isLogged: false,
          user: {},
          status: 'loaded',
        });
      });
  };

  render() {
    const { isLogged,
            user,
            cv,
            status,
            selectedTab,
            contact,
            isDisplayContent,
            displayContent,
            headline,
            summary,
            interest,
            // interests,
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
                            setIsDisplayContent: this.setIsDisplayContent,
                            setDisplayContent: this.setDisplayContent,
                            setInterest: this.setInterest,
                            setTab: this.setTab,
                            selectedTab,
                            contact,
                            isDisplayContent,
                            displayContent,
                            headline,
                            summary,
                            interest,
                            // interests,
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
  };
};
