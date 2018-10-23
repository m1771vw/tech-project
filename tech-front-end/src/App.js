import React, { Component } from 'react';
import Assignment from './components/Assignment';
import Employee from './components/Employee';
import Project from './components/Project';
import Forms from './components/Forms';

import './App.css';

class App extends Component {
  render() {
    return (
      <div >
        Hello world.
        {/* <Assignment /> */}
        {/* <Form someArray=["Assignment"] someType="text" 
                 someObject: {array: ["Assignment"], someType="text"} */}
        {/* <Employee /> */}
        {/* <Project /> */}
        <Forms someLabelName="AssignmentName"/>
      </div>
    );
  }
}

export default App;
