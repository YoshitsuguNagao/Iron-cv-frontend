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
              headline={authStore.headline}
              summary={authStore.summary}
              interest={authStore.interest}
              languages={authStore.languages}
              softSkill={authStore.softSkill}
              hardSkill={authStore.hardSkill}
              socialNetwork={authStore.socialNetwork} // add
              work={authStore.work} // add
              education={authStore.education} // add
              project={authStore.project} // add
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
            headline,
            summary,
            interest,
            languages,
            softSkill,
            hardSkill,
            socialNetwork,
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
                            setTab: this.setTab,
                            selectedTab,
                            contact,
                            headline,
                            summary,
                            interest,
                            languages,
                            softSkill,
                            hardSkill,
                            socialNetwork,
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
