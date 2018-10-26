import React, { Component } from 'react';
import './App.css';

import { Switch, Route, withRouter } from 'react-router-dom';
import { getAllAssignments, getAllProjects, getAllEmployees } from './Redux/Actions';

import Navbar from './Components/Navbar'
import Loader from './Components/LazyLoad';
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
} from './Redux/Actions';

import EmployeesPage from './Components/Employees/EmployeesPage';
import AssignmentsPage from './Components/Assignments/AssignmentsPage';
import ProjectsPage from './Components/Projects/ProjectsPage';

class App extends Component {
  state = {
    employeeData: [],
    assignmentData: [],
    projectData: []

  }
  componentDidMount() {
    this.props.getAllAssignments();
    this.props.getAllProjects();
    this.props.getAllEmployees();
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
    console.log("Updating toward Map Dispatch")
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

  render() {
    return (
      <div>
        <Navbar />
        <Loader />
        <Switch>

          <Route exact path='/' component={Dashboard} />
          <Route path='/e' component={EmployeesPage} />
          <Route path='/a' component={AssignmentsPage} />
          <Route path='/p' component={ProjectsPage} />
          <Route path='/assignments' render={(renderProps) =>
            <Form {...renderProps} className="form"
              title="Assignment Form"
              model={[
                { key: "assignment_name", label: "Assignment Name", type: "text", props: { required: true } },
                { key: "assignment_start_date", label: "Start Date", type: "text", props: { required: true } },
                { key: "assignment_end_date", label: "End Date", type: "text", props: { required: true } },
                { key: "assignment_est_hours", label: "Estimated Hours", type: "text", props: { required: true } },
                { key: "assignment_final_hours", label: "Final Hours", type: "text", props: { required: true } }


              ]}
              onSubmit={(model) => { this.onAssignmentSubmit(model) }}
              onDelete={(model) => { this.onDeleteAssignment(model) }}
            />} />

          <Route path='/update-assignment' render={() =>
            <Form className="form"
              title="Update Assignment"
              model={[
                { key: "assignment_name", label: "Assignment Name", type: "text", props: { required: true } },
                { key: "assignment_start_date", label: "Start Date", type: "text", props: { required: true } },
                { key: "assignment_end_date", label: "End Date", type: "text", props: { required: true } },
                { key: "assignment_est_hours", label: "Estimated Hours", type: "text", props: { required: true } },
                { key: "assignment_final_hours", label: "Total Hours", type: "text", props: { required: true } }

              ]}
              onUpdate={(model) => { this.onUpdateAssignment(model) }}
            />} />

          <Route path='/projects' render={(renderProps) =>
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

          <Route path='/update-project' render={(renderProps) =>
            <Form className="form"
              {...renderProps} 
              title="Update Project"
              model={[
                { key: "project_name", label: "Assignment Name", type: "text", props: { required: true } },
                { key: "project_start_date", label: "Start Date", type: "text", props: { required: true } },
                { key: "project_end_date", label: "End Date", type: "text", props: { required: true } },
                { key: "estHours", label: "Estimated Hours", type: "text", props: { required: true } },
                { key: "elapsHours", label: "Elapased Hours", type: "text", props: { required: true } }

              ]}
              onUpdate={(model) => { this.onUpdateProject(model) }}
            />} />
          <Route path='/employees' render={(renderProps) =>
            <Form 
              {...renderProps} 
              className="form"
              title="Employee Form"
              model={[
                { key: "first_name", label: "First Name", type: "text", props: { required: true } },
                { key: "last_name", label: "Last Name", type: "text", props: { required: true } },
                { key: "position", label: "Position", type: "text", props: { required: true } },
                { key: "profile", label: "Profile", type: "text ", props: { required: true } }
              ]}
              onSubmit={(model) => { this.onEmployeeSubmit(model) }}
              onDelete={(model) => { this.onDeleteEmployee(model) }}

            />} />

          <Route path='/update-employee' render={(renderProps) =>  //Design form 'to-fill' data here
            <Form 
              className="form"
              {...renderProps} 
              title="Update Employee"
              model={[
                { key: "first_name", label: "Name", type: "text", props: { required: true } },
                { key: "last_name", label: "Title", type: "text", props: { required: true } },
                { key: "position", label: "Project", type: "text", props: { required: true } },
                { key: "profile", label: "Profile", type: "text ", props: { required: true } }
              ]}
              onUpdate={(model) => { this.onUpdateEmployee(model) }}
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
  getAllAssignments: () => dispatch(getAllAssignments()),
  getAllProjects: () => dispatch(getAllProjects()),
  getAllEmployees: () => dispatch(getAllEmployees()),


})

export default withRouter(connect(null, mapDispatchToProps)(App));
