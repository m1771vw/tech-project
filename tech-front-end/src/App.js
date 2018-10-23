import React, { Component } from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom';

import Navbar          from './components/Navbar'
import Loader          from './components/LazyLoad';
import Dashboard       from './components/Dashboard/Dashboard';
import Form            from './components/Forms/DynamicForm/Form';

import { connect } from 'react-redux';
import { submitProject } from './Redux/Actions';
import { submitEmployee} from './Redux/Actions';
import { submitAssignment} from './Redux/Actions';

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

  onProjectSubmit = (model) =>{
    //generate a unique model id# here
    model.id = ""
    alert(JSON.stringify(model));
    this.props.submitProject();
    this.setState({
      projectData: [model, ...this.state.projectData]
    })
  }


  onAssignmentSubmit = (model) =>{
    model.id = ""
    console.log("On assignment submit Clicked")
    this.props.submitAssignment();
    this.setState({
      assignmentData: [ model, ...this.state.assignmentData]

    })

  }

  onEmployeeSubmit = (model) =>{
    model.id = ""
    this.props.submitEmployee();
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
                                                  />}/>
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
    // submitForms: () => dispatch(submitForms()),
    submitProject: () => dispatch(submitProject()),
    submitEmployee: ()=> dispatch(submitEmployee()),
    submitAssignment: ()=> dispatch(submitAssignment())
})

export default connect(null, mapDispatchToProps)(App);
