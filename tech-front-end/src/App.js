import React, { Component } from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom';

import Navbar           from './Components/Navbar'
import AssignmentsPage from './Components/Assignments/AssignmentsPage';
import EmployeesPage   from './Components/Employees/EmployeesPage';
import ProjectsPage    from './Components/Projects/ProjectsPage';
import Dashboard       from './Components/Dashboard/Dashboard';
class App extends Component {
  render() {
    return (
      <div >
        <Navbar />
        <Switch>
          <Route exact path='/' component={Dashboard}/>
          <Route path='/assignments' component={AssignmentsPage}/>
          <Route path='/employees' component={EmployeesPage}/>
          <Route path='/projects' component={ProjectsPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
