import React, { Component } from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom';

import Navbar          from './components/Navbar'
import Loader          from './components/LazyLoad';
import Dashboard       from './components/Dashboard/Dashboard';
import Form            from './components/Forms/DynamicForm/Form';

import { connect } from 'react-redux';
import { submitProject, submitEmployee, submitAssignment, deleteEmployee, deleteAssignment, deleteProject } from './Redux/Actions';

class App extends Component {
  state = {

    employeeData: [
      { id: 1, name: "amy", title: "Senior engineer ", project: "B.com", profile: "wd.com" },
      { id: 2, name: "bob", title: "Mid engineer ", project: "B.com", profile: "wc.com" },
      { id: 3, name: "charles", title: "Junior engineer ", project: "A.com", profile: "ww.com" }

    ],

    assignmentData:[],
    projectData:[]


  }
 

  onDeleteEmployee = (employee) =>{
    let index = 1
    console.log("delete button pressed")
    this.props.deleteEmployee(employee, index);

  }

  onDeleteAssignment = (assignment) =>{
    let index = 1
    console.log("delete button pressed")
    this.props.deleteAssignment(assignment, index);

  }

  onDeleteProject = (project) =>{
    let index = 1
    console.log("delete button pressed")
    this.props.deleteProject(project, index);

  }



  onProjectSubmit = (model) =>{
    //generate a unique model id# here
    model.id = ""
    this.props.submitProject(model);
    this.setState({
      projectData: [model, ...this.state.projectData]
    })
  }

  onAssignmentSubmit = (model) =>{
    model.id = ""
    this.props.submitAssignment(model);
    this.setState({
      assignmentData: [ model, ...this.state.assignmentData]

    })

  }

  onEmployeeSubmit = (model) =>{
    model.id = ""
    this.props.submitEmployee(model);
    this.setState({
      employeeData: [ model, ...this.state.employeeData]

    })

  }
  


  render() {
    return (
      <div >

        <Navbar /> 
        <Loader />
        <Switch>
          <Route exact path='/' component={Dashboard}/>

          <Route path='/assignments' component={() => 
                                              <Form className = "form"
                                                title = "Assignment Form"
                                                model ={[
                                                  {key: "name", label: "Assignment Name", type: "text", props: {required: true}},
                                                  {key: "startDate", label: "Start Date", type: "text",  props: {required: true}},
                                                  {key: "endDate", label: "End Date", type: "text", props: {required: true}},
                                                  {key: "estHours", label: "Estimated Hours", type: "text", props:{required: true}},
                                                  {key: "elapsHours", label: "Elapased Hours", type: "text", props: {required:true}}


                                                ]}
                                                onSubmit = {(model) => {this.onAssignmentSubmit(model)}}
                                                onDelete = {(model) => {this.onDeleteAssignment(model)}}
                                              />}/>
                                              
          <Route path='/projects' component={()=>
                                            <Form className = "form"
                                              title = "Project Form"
                                              model = {[
                                                {key: "name", label: " Project Name", type: "text", props: {required: true}},
                                                {key: "startDate", label: "Start Date", type:"text", props: {required: true}},
                                                {key: "endDate", label: "Deadline Date", type:"text", props: {required: true}}
                                               
                                                
                                                ]}
                                                onSubmit = {(model) => {this.onProjectSubmit(model)}}
                                                onDelete = {(model) => {this.onDeleteProject(model)}}
                                                />}/>
          <Route path='/employees' render={()=>  //Design form 'to-fill' data here
                                            <Form className = "form"
                                                  title = "Employee Form"
                                                  model = {[
                                                    {key: "firstName", label:"Name", type: "text", props: {required: true}},
                                                    {key: "lastName", label:"Title", type: "text", props: {required: true}},
                                                    {key: "position", label: "Project", type: "text", props: {required: true}},
                                                    {key: "profile", label: "Profile", type: "text ", props: {required: true}}
                                                  ]}  
                                                  onSubmit = {(model) => {this.onEmployeeSubmit(model)}}
                                                  onDelete = {(model) => {this.onDeleteEmployee(model)}}
                                                  />}/>
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
    // submitForms: () => dispatch(submitForms()),
    submitProject: (project) => dispatch(submitProject(project)),
    deleteProject: (project, index) => dispatch(deleteProject(project, index)),
    submitEmployee: (employee)=> dispatch(submitEmployee(employee)),
    deleteEmployee: (employee, index)=> dispatch(deleteEmployee(employee, index)),
    submitAssignment: (assignment)=> dispatch(submitAssignment(assignment)),
    deleteAssignment: (assignment, index)=> dispatch(deleteAssignment(assignment, index))
    
})

export default connect(null, mapDispatchToProps)(App);
