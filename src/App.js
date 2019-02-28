import React, { Component } from 'react';
import {Switch} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import Navbar from './components/Navbar';
import Private from './pages/Private';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import EditCV from './pages/EditCV';
import AuthProvider from './components/AuthProvider';
import './App.css';


class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className="main-container">
          {/* <h1>Basic React Authentication</h1> */}
          <Navbar />
          {/* <Switch> */}
            <AnonRoute exact path="/signup" component={Signup} />
            <AnonRoute exact path="/login" component={Login} />
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/private" component={Private} />
            <PrivateRoute exact path="/edit/:cvId" component={EditCV} />
          {/* </Switch> */}
        </div>
      </AuthProvider>
    )
  }
}

export default App;
