import React, { Component } from "react";
import "./App.css";

import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { getAllAssignments, getAllProjects, getAllEmployees } from './Redux/Actions';

import Navbar from './Components/Navbar'
import Login from './Components/Login'
import Logout from './Components/Logout'
import Dashboard from './Components/Dashboard/Dashboard';
import Form from './Components/Forms/DynamicForm/Form';

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
import AssignmentsPage from './Components/Assignments/AssignmentsPage';
import ProjectsPage from './Components/Projects/ProjectsPage';
import AssignmentDetails from './Components/Assignments/AssignmentDetails';
import ProjectDetails from './Components/Projects/ProjectDetails';
import AssignmentEdit from './Components/Assignments/AssignmentEdit';
import EmployeeDetails from './Components/Employees/EmployeeDetails';
import EmployeeEdit from './Components/Employees/EmployeeEdit';

import PrivateRoute from './PrivateRoute';
import NoMatch from './NoMatch';
class App extends Component {
  state = {
    employeeData: [],
    assignmentData: [],
    projectData: [],

  }
  componentDidMount() {
    console.log("Fetching initial data for store");
    // this.props.getAllAssignments();
    this.props.getAllProjects();
    this.props.getAllEmployees();
  }
  onDeleteEmployee = employee => {
    let index = 1;
    this.props.deleteEmployee(employee, index);
  };

  onDeleteAssignment = assignment => {
    let index = 1;
    this.props.deleteAssignment(assignment, index);
  };

  onDeleteProject = project => {
    let index = 1;
    this.props.deleteProject(project, index);
  };

  onUpdateAssignment = (assignment, index) => {
    console.log("Updating toward Map Dispatch")
    console.log("New Assignment: ", assignment);
    console.log("New Assignment ID: ", index);
    this.props.updateAssignment(assignment, index);
  };

  onUpdateEmployee = (employee, id) => {
    console.log("Updating toward Map Dispatch")
    this.props.updateEmployee(employee, id);
  }

  onUpdateProject = project => {
    console.log("Updating toward Map Dispatch");
    let index = 0;
    this.props.updateProject(project, index);
  };

  onProjectSubmit = model => {
    //generate a unique model id# here
    model.id = "";
    this.props.submitProject(model);
    this.setState({
      projectData: [model, ...this.state.projectData]
    });
  };

  onAssignmentSubmit = model => {
    model.id = "";
    this.props.submitAssignment(model);
    this.setState({
      assignmentData: [model, ...this.state.assignmentData]
    });
  };

  onEmployeeSubmit = model => {
    model.id = "";
    this.props.submitEmployee(model);
    this.setState({
      employeeData: [model, ...this.state.employeeData]
    });
  };

  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <PrivateRoute authed={localStorage.isAuthorized === 'true'} path='/dashboard' component={Dashboard} />

          <PrivateRoute authed={localStorage.isAuthorized === 'true'} exact path='/' component={Dashboard} />
          <Route path='/login' component={Login} />
          <Route path='/logout' component={Logout} />
          <PrivateRoute authed={localStorage.isAuthorized === 'true'} exact path='/employees' component={EmployeesPage} />
          <PrivateRoute authed={localStorage.isAuthorized === 'true'} exact path='/assignments' component={AssignmentsPage} />
          <PrivateRoute authed={localStorage.isAuthorized === 'true'} exact path='/projects' component={ProjectsPage} />
          <PrivateRoute authed={localStorage.isAuthorized === 'true'}  path={`/projects/details/:id`} render={(renderProps) => <ProjectDetails {...renderProps} />} />

          {/* Assignment Routes */}
          <PrivateRoute authed={localStorage.isAuthorized === 'true'}  path='/create/assignment' render={(renderProps) =>
            <Form className="form"
              title="Input Assignment"
              model={[
                { key: "assignment_name", label: "Assign Name", type: "text", props: { required: true } },
                { key: "assignment_start_date", label: "Start Date", type: "text", props: { required: true } },
                { key: "assignment_end_date", label: "End Date", type: "text", props: { required: true } },
                { key: "status_id", label: "Status ID", type: "text", props: { required: true } },
                { key: "project_id", label: "Project ID", type: "text", props: { required: true } },
                { key: "assignment_est_hours", label: "Estimated Hours", type: "text", props: { required: true } },
                { key: "assignment_final_hours", label: "Elapsed Hours", type: "text", props: { required: true } }
              ]}
              onSubmit={(model) => { this.onAssignmentSubmit(model) }}
              onDelete={(model) => { this.onDeleteAssignment(model) }}
            />} />
          <PrivateRoute authed={localStorage.isAuthorized === 'true'}  path={`/assignments/details/:id`} render={(renderProps) => <AssignmentDetails {...renderProps} />} />
          <PrivateRoute authed={localStorage.isAuthorized === 'true'}  path={`/assignments/edit/:id`} render={(renderProps) =>
            <AssignmentEdit {...renderProps}
              onSubmit={this.onUpdateAssignment}
            />} />

          {/* Project Routes */}

          <PrivateRoute authed={localStorage.isAuthorized === 'true'}  path='/create/project' render={(renderProps) =>
            <Form {...renderProps} className="form"
              title="Project Form"
              model={[
                { key: "project_name", label: " Project Name", type: "text", props: { required: true } },
                { key: "project_start_date", label: "Start Date", type: "text", props: { required: true } },
                { key: "project_end_date", label: "Deadline Date", type: "text", props: { required: true } },
                { key: "status_id", label: "Current Status", type: "text", props: { required: true } }

              ]}
              onSubmit={(model) => { this.onProjectSubmit(model) }}
              onDelete={(model) => { this.onDeleteProject(model) }}
            />} />

          {/* Employee Routes */}
          <PrivateRoute authed={localStorage.isAuthorized === 'true'}  path='/create/employee' render={(renderProps) =>
            <Form
              {...renderProps}
              className="form"
              title="Employee Form"
              model={[
                { key: "first_name", label: "First Name", type: "text", props: { required: true } },
                { key: "last_name", label: "Last Name", type: "text", props: { required: true } },
                { key: "position", label: "Position", type: "text", props: { required: true } },
              ]}
              onSubmit={(model) => { this.onEmployeeSubmit(model) }}
              onDelete={(model) => { this.onDeleteEmployee(model) }}

            />} />
          <PrivateRoute authed={localStorage.isAuthorized === 'true'} 
            render={renderProps => <EmployeeDetails {...renderProps} />}
          />
          <PrivateRoute authed={localStorage.isAuthorized === 'true'}  path={`/employee/edit/:id`} render={(renderProps) =>
            <EmployeeEdit {...renderProps}
              onSubmit={this.onUpdateEmployee}
            />} />
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
  deleteEmployee: (employee, index) =>
    dispatch(deleteEmployee(employee, index)),
  updateEmployee: (employee, index) =>
    dispatch(updateEmployee(employee, index)),
  submitAssignment: assignment => dispatch(submitAssignment(assignment)),
  deleteAssignment: (assignment, index) =>
    dispatch(deleteAssignment(assignment, index)),
  updateAssignment: (assignment, index) =>
    dispatch(updateAssignment(assignment, index)),
  getAllAssignments: () => dispatch(getAllAssignments()),
  getAllProjects: () => dispatch(getAllProjects()),
  getAllEmployees: () => dispatch(getAllEmployees()),


})

export default withRouter(connect(null, mapDispatchToProps)(App));
