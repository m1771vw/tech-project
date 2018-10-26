import React, { Component } from 'react';
import './App.css';

import { Switch, Route, withRouter } from 'react-router-dom';

import Navbar from './Components/Navbar'
import Loader from './Components/LazyLoad';
import Login from './Components/Login'
import Dashboard from './Components/Dashboard/Dashboard';
import Forms from './Components/Forms/DynamicForm/Form';

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
} from './Redux/Actions';


import EmployeesPage from './Components/Employees/EmployeesPage';
import AssignmentsPage from './Components/Assignments/AssignmentsPage';
import ProjectsPage from './Components/Projects/ProjectsPage';
class App extends Component {
  state = {
    employeeData: [],
    assignmentData: [],
    projectData: [],
    signupData:[]

  }

  onDeleteEmployee = (employee) => {
    let index = 1
    this.props.deleteEmployee(employee, index);
  }

  onDeleteAssignment = (assignment) => {
    let index = 1
    this.props.deleteAssignment(assignment, index);

  }

  onDeleteProject = (project) => {
    let index = 1
    this.props.deleteProject(project, index);

  }

  onUpdateAssignment = (assignment) => {
    let index = 0
    this.props.updateAssignment(assignment, index);
  }

  onUpdateEmployee = (employee) => {
    console.log("Updating toward Map Dispatch")
    let index = 0
    this.props.updateEmployee(employee, index);
  }

  onUpdateProject = (project) => {
    console.log("Updating toward Map Dispatch")
    let index = 0
    this.props.updateProject(project, index);
  }


  onProjectSubmit = (model) => {
    //generate a unique model id# here
    model.id = ""
    this.props.submitProject(model);
    this.setState({
      projectData: [model, ...this.state.projectData]
    })
  }

  onAssignmentSubmit = (model) => {
    model.id = ""
    this.props.submitAssignment(model);
    this.setState({
      assignmentData: [model, ...this.state.assignmentData]

    })
  }

  onEmployeeSubmit = (model) => {
    model.id = ""
    this.props.submitEmployee(model);
    this.setState({
      employeeData: [model, ...this.state.employeeData]

    })
  }

  onSignupSubmit = (model) => {
    let index = 0
    this.props.signUp(model);
    this.setState({
      signUpData: [model, ...this.state.assignmentData]

    })
  }



  render() {
    return (
      <div >

        <Navbar />
        <Loader />
        
        <Switch>

          <Route exact path='/' component={Dashboard} />
          <Route path = '/login' component={Login}/>
          <Route path='/e' component={EmployeesPage} />
          <Route path='/a' component={AssignmentsPage} />
          <Route path='/p' component={ProjectsPage} />
          <Route path='/assignments' component={() =>
            <Forms className="form"
              title="Input Assignment"
              model={[
                { key: "assignment_name", label: "Assign Name", type: "text", props: { required: true } },
                { key: "assignment_start_date", label: "Start Date", type: "text", props: { required: true } },
                { key: "ssignment_end_date", label: "End Date", type: "text", props: { required: true } },
                { key: "assignment_est_hours", label: "Estimated Hours", type: "text", props: { required: true } },
                { key: "assignment_final_hours", label: "Elapsed Hours", type: "text", props: { required: true } }


              ]}
              onSubmit={(model) => { this.onAssignmentSubmit(model) }}
              onDelete={(model) => { this.onDeleteAssignment(model) }}
            />} />

          <Route path='/update-assignment' component={() =>
            <Forms className="form"
              title="Update Assignment"
              model={[
                { key: "assignment_name", label: "Assign Name", type: "text", props: { required: true } },
                { key: "assignment_start_date", label: "Start Date", type: "text", props: { required: true } },
                { key: "assignment_end_date", label: "End Date", type: "text", props: { required: true } },
                { key: "assignment_est_hours", label: "Estimated Hours", type: "text", props: { required: true } },
                { key: "assignment_final_hours", label: "Elapsed Hours", type: "text", props: { required: true } }

              ]}
              onUpdate={(model) => { this.onUpdateAssignment(model) }}
            />} />

          <Route path='/projects' component={() =>
            <Forms className="form"
              title="Input Project"
              model={[
                { key: "project_name", label: " Project Name", type: "text", props: { required: true } },
                { key: "project_start_date", label: "Start Date", type: "text", props: { required: true } },
                { key: "project_end_date", label: "Deadline Date", type: "text", props: { required: true } }


              ]}
              onSubmit={(model) => { this.onProjectSubmit(model) }}
              onDelete={(model) => { this.onDeleteProject(model) }}
            />} />

          <Route path='/update-project' component={() =>
            <Forms className="form"
              title="Update Project"
              model={[
                { key: "name", label: "Assign Name", type: "text", props: { required: true } },
                { key: "startDate", label: "Start Date", type: "text", props: { required: true } },
                { key: "endDate", label: "End Date", type: "text", props: { required: true } },
                { key: "estHours", label: "Estimated Hours", type: "text", props: { required: true } },
                { key: "elapsHours", label: "Elapsed Hours", type: "text", props: { required: true } }

              ]}
              onUpdate={(model) => { this.onUpdateProject(model) }}
            />} />
          <Route path='/employees' render={() =>
            <Forms className="form"
              title="Input Employee"
              model={[
                { key: "first_name", label: "Name", type: "text", props: { required: true } },
                { key: "last_name", label: "Title", type: "text", props: { required: true } },
                { key: "position", label: "Project", type: "text", props: { required: true } },
                { key: "profile", label: "Profile", type: "text ", props: { required: true } }
              ]}
              onSubmit={(model) => { this.onEmployeeSubmit(model) }}
              onDelete={(model) => { this.onDeleteEmployee(model) }}

            />} />

          <Route path='/update-employee' render={() =>  //Design form 'to-fill' data here
            <Forms className="form"
              title="Update Employee"
              model={[
                { key: "first_name", label: "Name", type: "text", props: { required: true } },
                { key: "last_name", label: "Title", type: "text", props: { required: true } },
                { key: "position", label: "Project", type: "text", props: { required: true } },
                { key: "profile", label: "Profile", type: "text ", props: { required: true } }
              ]}
              onUpdate={(model) => { this.onUpdateEmployee(model) }}
            />} />

            <Route path='/signup' component={() =>
            <Forms className="form"
              title="Sign Up Today"
              model={[
                { key: "First Name", label: "First Name", type: "text", props: { required: true } },
                { key: "Last Name", label: "Last Name", type: "text", props: { required: true } },
                { key: "Email", label: "Email", type: "text", props: { required: true } },
                { key: "Password", label: "Password", type: "text", props: { required: true } },
                { key: "Confirm Password", label: "Confirm Password", type: "text", props: { required: true } }


              ]}
              onSubmit={(model) => { this.onSignUp(model) }}
          
            />} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  // submitForms: () => dispatch(submitForms()),
  submitProject: (project) => dispatch(submitProject(project)),
  deleteProject: (project, index) => dispatch(deleteProject(project, index)),
  updateProject: (project, index) => dispatch(updateProject(project, index)),
  submitEmployee: (employee) => dispatch(submitEmployee(employee)),
  deleteEmployee: (employee, index) => dispatch(deleteEmployee(employee, index)),
  updateEmployee: (employee, index) => dispatch(updateEmployee(employee, index)),
  submitAssignment: (assignment) => dispatch(submitAssignment(assignment)),
  deleteAssignment: (assignment, index) => dispatch(deleteAssignment(assignment, index)),
  updateAssignment: (assignment, index) => dispatch(updateAssignment(assignment, index)),
  
})

export default withRouter(connect(null, mapDispatchToProps)(App));
