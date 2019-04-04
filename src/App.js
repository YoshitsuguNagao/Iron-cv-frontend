import React, { Component } from 'react';
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import EditCV from './pages/EditCV';
import AuthProvider from './components/AuthProvider';
import './App.css';
import firebase from 'firebase'
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBqq-Tssch1Qt8PLIdBfLoepb4iA8SVrJ8",
    authDomain: "iron-cv.firebaseapp.com",
    databaseURL: "https://iron-cv.firebaseio.com",
    projectId: "iron-cv",
    storageBucket: "iron-cv.appspot.com",
    messagingSenderId: "782979965386"
  };
  firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className="main-container">
          <Navbar />
          <AnonRoute exact path="/" component={Login} />
          <AnonRoute exact path="/signup" component={Signup} />
          <AnonRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute exact path="/edit/:cvId" component={EditCV} />
        </div>
      </AuthProvider>
    );
  };
};

export default App;
