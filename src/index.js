import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/style.scss';

// import 'milligram/dist/milligram.css';

ReactDOM.render(
  <Router>
    <App />
  </Router>,

  document.getElementById('root'));

