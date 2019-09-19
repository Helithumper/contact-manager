import React, {useState} from 'react';
import logo from '../logo.svg';
import '../styles/App.css';
import Login from './Login';
import ContactsList from '../components/ContactsList';

function App() {
  const [values, setValues] = useState({
    username: '',
    password: '',
    userUuid: '',
    sessionKey: ''
  });

  const handleChange = (name, changedValue) => {
    setValues({...values, [name]: changedValue});
    console.log(values);
  };

  return (
    <div className="App">
      <Login handleChange={handleChange} values={values}/>
    </div>
  );
}

export default App;
