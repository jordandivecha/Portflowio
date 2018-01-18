import React, { Component } from 'react';
import logo from './logo.svg';
import ReactFilestack, {client} from 'filestack-react';
import Filestack from './components/Filestack';
import './App.css';

class App extends Component {
  render() {
    return (
      <Filestack />
    );
  }
}

export default App;
