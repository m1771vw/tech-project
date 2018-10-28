import React, { Component } from 'react';
import './App.css';

import { Switch, Route, withRouter } from 'react-router-dom';
import { getAllAssignments, getAllProjects, getAllEmployees } from './Redux/Actions';

import Navbar from './Components/Navbar'
import Loader from './Components/LazyLoad';
import Login from './Components/Login'
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
import AssignmentDetails from './Components/Assignments/AssignmentDetails';
import ProjectDetails from './Components/Projects/ProjectDetails';

class App extends Component {
  state = {
    employeeData: [],
    assignmentData: [],
    projectData: [],
    signupData:[]

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

  onSignupSubmit = (model) => {
    let index = 0
    this.props.signUp(model);
    this.setState({
      signUpData: [model, ...this.state.assignmentData]

    })
  }



  render() {
    return (
      <div>
        <Navbar />
        {/* <Loader /> */}
        <Switch>

          <Route exact path='/' component={Dashboard} />
          <Route path = '/login' component={Login}/>
          <Route path='/employees' component={EmployeesPage} />
          <Route exact path='/assignments' component={AssignmentsPage} />
          <Route path='/projects' component={ProjectsPage} />
          <Route path='/projectdetails' component={ProjectDetails} />
          <Route path='/createAssignments' render={(renderProps) =>
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
          <Route path={`/assignments/details/:id`} render={(renderProps) => <AssignmentDetails {...renderProps}/>}/>
          <Route path='/update-assignment' render={(renderProps) =>
            <Form {...renderProps} className="form"
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

            {/* Project Routes */}

          <Route path='/createProjects' render={(renderProps) =>
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
                { key: "elapsHours", label: "Elapsed Hours", type: "text", props: { required: true } }

              ]}
              onUpdate={(model) => { this.onUpdateProject(model) }}
            />} />

          {/* Employee Routes */}
          <Route path='/createEmployees' render={(renderProps) =>
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

            <Route path='/signup' component={(renderProps) =>
            <Form {...renderProps} className="form"
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
  getAllAssignments: () => dispatch(getAllAssignments()),
  getAllProjects: () => dispatch(getAllProjects()),
  getAllEmployees: () => dispatch(getAllEmployees()),


})

export default withRouter(connect(null, mapDispatchToProps)(App));
