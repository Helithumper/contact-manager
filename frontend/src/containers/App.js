import React, {useState} from 'react';
import logo from '../logo.svg';
import '../styles/App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import Login from './Login';
import ContactsList from '../components/ContactsList';
import Header from './Header';
import Container from './Container';

function App() {

  return (
    <div className="App">
      <Router>
        <div>
          {/* <Header/> */}
          <Container/>
        </div>
      </Router>
    </div>
  );
}

export default App;
