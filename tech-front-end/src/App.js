import React, { Component } from 'react';
import Assignment from './components/Assignment'
import Employee from './components/Employee'
import Project from './components/Project'


import './App.css';

class App extends Component {
  render() {
    return (
      <div >
        Hello world.
        <Assignment />
        <Employee />
        <Project />
      </div>
    );
  }
}

export default App;
