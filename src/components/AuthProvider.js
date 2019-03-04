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
              logout={authStore.logout}
              setUser={authStore.setUser}
              setTab={authStore.setTab}
              selectedTab={authStore.selectedTab} // add
              contact={authStore.contact}
              title={authStore.title}
              summary={authStore.summary}
              socialNetwork={authStore.user.socialNetwork} // add
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
    status: 'loading',
    selectedTab: 'profile', // add
    contact: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      phone: '',
    },
    title: '',
    summary: '',
    socialNetwork: {
      github: '',
      medium: '',
      linkedin: '',
    },
    interests:[],
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
      tasks: [],
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
      tasks: [],
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

  // add
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
            status,
            selectedTab,
            contact,
            socialNetwork,
            work,
            education,
            project
          } = this.state; // add
    const { children } = this.props;
    switch (status) {
      case 'loading':
        return <div>Loading</div>
      default:
        return (
          <Provider value={{isLogged,
                            user,
                            logout: this.logoutUser,
                            setUser: this.setUser,
                            setTab: this.setTab,
                            selectedTab,
                            contact,
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
