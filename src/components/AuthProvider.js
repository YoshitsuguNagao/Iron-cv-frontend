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
              isPdfView={authStore.isPdfView}
              user={authStore.user}
              cv={authStore.cv}
              logout={authStore.logout}
              setUser={authStore.setUser}
              setPdfView={authStore.setPdfView}
              setCv={authStore.setCv}
              setTab={authStore.setTab}
              selectedTab={authStore.selectedTab}
              contact={authStore.contact}
              setContact={authStore.setContact}
              setSocialNetwork={authStore.setSocialNetwork}
              setAvatarURL={authStore.setAvatarURL}
              isDisplayContent={authStore.isDisplayContent}
              displayContent={authStore.displayContent}
              setIsDisplayContent={authStore.setIsDisplayContent}
              setDisplayContent={authStore.setDisplayContent}
              headline={authStore.headline}
              summary={authStore.summary}
              setHeadlines={authStore.setHeadlines}
              interest={authStore.interest}
              setInterest={authStore.setInterest}
              languages={authStore.languages}
              softSkill={authStore.softSkill}
              setSoftSkill={authStore.setSoftSkill}
              hardSkill={authStore.hardSkill}
              setHardSkill={authStore.setHardSkill}
              socialNetwork={authStore.socialNetwork}
              avatarURL={authStore.avatarURL}
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
    isPdfView: true,
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
    softSkill: '',
    hardSkill: '',
    interest: '',
    languages: {
      language: '',
      level: '',
    },
    socialNetwork: {
      github: '',
      medium: '',
      linkedin: '',
    },
    avatarURL: '',
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

  setPdfView = (isPdfView) => {
    this.setState({
      isPdfView: isPdfView
    })
  }

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

  setSocialNetwork = (socialNetwork) => {
    this.setState({
      socialNetwork,
    });
  };

  setAvatarURL = (avatarURL) => {
    this.setState({
      avatarURL,
    });
  };

  setIsDisplayContent = (isDisplayContent) => {
    this.setState({
      isDisplayContent,
    });
  };

  setDisplayContent = (displayContent) => {
    if(displayContent.work.length !== 0 &&
       displayContent.education !== 0 &&
       displayContent.project !== 0) {
         this.setState({
           displayContent,
         });
       }
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

  setSoftSkill = (softSkill) => {
    this.setState({
      softSkill,
    })
  }

  setHardSkill = (hardSkill) => {
    this.setState({
      hardSkill,
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
            isPdfView,
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
            languages,
            softSkill,
            hardSkill,
            socialNetwork,
            avatarURL,
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
                            isPdfView,
                            user,
                            cv,
                            logout: this.logoutUser,
                            setUser: this.setUser,
                            setPdfView: this.setPdfView,
                            setCv: this.setCv,
                            setContact: this.setContact,
                            setSocialNetwork: this.setSocialNetwork,
                            setAvatarURL: this.setAvatarURL,
                            setHeadlines: this.setHeadlines,
                            setIsDisplayContent: this.setIsDisplayContent,
                            setDisplayContent: this.setDisplayContent,
                            setInterest: this.setInterest,
                            setSoftSkill: this.setSoftSkill,
                            setHardSkill: this.setHardSkill,
                            setTab: this.setTab,
                            selectedTab,
                            contact,
                            isDisplayContent,
                            displayContent,
                            headline,
                            summary,
                            interest,
                            languages,
                            softSkill,
                            hardSkill,
                            socialNetwork,
                            avatarURL,
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
