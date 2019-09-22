import React, {useState} from 'react';
import '../styles/App.css';
import {BrowserRouter as Router} from 'react-router-dom';
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
