import React, { Component } from "react";
import "./App.css";

import { Switch, Route, withRouter } from 'react-router-dom';
import { getAllAssignments, getAllProjects, getAllEmployees } from './Redux/Actions';

import Navbar from './Components/Navbar'
import Login from './Components/Login'
import Logout from './Components/Logout'
import Dashboard from './Components/Dashboard/Dashboard';

import { connect } from 'react-redux';
import {
  submitProject,
  submitEmployee,
  submitAssignment,
  deleteEmployee,
  deleteAssignment,
  deleteProject,
  updateAssignment,
  updateEmployee,
  updateProject
} from "./Redux/Actions";

import EmployeesPage from './Components/Employees/EmployeesPage';
import ProjectsPage from './Components/Projects/ProjectsPage';
import AssignmentDetails from './Components/Assignments/AssignmentDetails';
import ProjectDetails from './Components/Projects/ProjectDetails';
import EmployeeDetails from './Components/Employees/EmployeeDetails';


import PrivateRoute from './PrivateRoute';
import NoMatch from './NoMatch';
class App extends Component {
  state = {}
  componentDidMount() {
    console.log("Fetching initial data for store");
    // this.props.getAllAssignments();
    this.props.getAllProjects();
    this.props.getAllEmployees();
  }

  render() {
    return (
      <div className='dashboard'>
        <Navbar />
        <Switch>
          <PrivateRoute authed={localStorage.isAuthorized === 'true'} path='/dashboard' component={Dashboard} />

          <PrivateRoute authed={localStorage.isAuthorized === 'true'} exact path='/' component={Dashboard} />
          <Route path='/login' component={Login} />
          <Route path='/logout' component={Logout} />
          <PrivateRoute authed={localStorage.isAuthorized === 'true'} exact path='/employees' component={EmployeesPage} />
          <PrivateRoute authed={localStorage.isAuthorized === 'true'} exact path='/projects' component={ProjectsPage} />
          <PrivateRoute authed={localStorage.isAuthorized === 'true'}  path={`/projects/details/:id`} component={ProjectDetails} />

          {/* Assignment Routes */}
          <PrivateRoute authed={localStorage.isAuthorized === 'true'}  path={`/assignments/details/:id`} component={AssignmentDetails} />
          <PrivateRoute authed={localStorage.isAuthorized === 'true'} path={`/employees/details/:id`} component={EmployeeDetails}/>
          <PrivateRoute authed={localStorage.isAuthorized === 'true'} component={NoMatch} />

        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  // submitForms: () => dispatch(submitForms()),
  submitProject: project => dispatch(submitProject(project)),
  deleteProject: (project, index) => dispatch(deleteProject(project, index)),
  updateProject: (project, index) => dispatch(updateProject(project, index)),
  submitEmployee: employee => dispatch(submitEmployee(employee)),
  deleteEmployee: (employee, index) => dispatch(deleteEmployee(employee, index)),
  updateEmployee: (employee, index) => dispatch(updateEmployee(employee, index)),
  submitAssignment: assignment => dispatch(submitAssignment(assignment)),
  deleteAssignment: (assignment, index) => dispatch(deleteAssignment(assignment, index)),
  updateAssignment: (assignment, index) => dispatch(updateAssignment(assignment, index)),
  getAllAssignments: () => dispatch(getAllAssignments()),
  getAllProjects: () => dispatch(getAllProjects()),
  getAllEmployees: () => dispatch(getAllEmployees()),


})

export default withRouter(connect(null, mapDispatchToProps)(App));
