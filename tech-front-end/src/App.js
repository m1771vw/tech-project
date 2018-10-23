import React, { Component } from 'react';
import './App.css';

// import { Switch, Route } from 'react-router-dom';

// import Navbar          from './Components/Navbar'
// import Loader          from './Components/LazyLoad';
// import AssignmentsPage from './Components/Assignments/AssignmentsPage';
// import EmployeesPage   from './Components/Employees/EmployeesPage';
// import ProjectsPage    from './Components/Projects/ProjectsPage';
// import Dashboard       from './Components/Dashboard/Dashboard';
import FormStudy       from './Components/Forms/DynamicForm/FormStudy';

class App extends Component {
  state = {

    data: [
      { id: 1, name: "amy", title: "Senior engineer ", project: "B.com", profile: "wd.com" },
      { id: 2, name: "bob", title: "Mid engineer ", project: "B.com", profile: "wc.com" },
      { id: 3, name: "charles", title: "Junior engineer ", project: "A.com", profile: "ww.com" }


    ]
  }

  onSubmit = (model) =>{
    //generate a unique model id# here
    model.id = ""
    alert(JSON.stringify(model));
    this.setState({
      data: [model, ...this.state.data]
    })

  }

  render() {
    return (
      <div >
        {/* <Navbar /> */}
        {/* <Loader /> */}
        {/* <Switch>
          <Route exact path='/' component={Dashboard}/>
          <Route path='/assignments' component={AssignmentsPage}/>
          <Route path='/employees' component={EmployeesPage}/>
          <Route path='/projects' component={ProjectsPage}/>
          <Route path='/forms' component={FormStudy}/>
        </Switch> */}

            {/* //Design form 'to-fill' data here */}
        <FormStudy className = "form"
          title = "Employee Form"
          model = {[
            {key: "name", label:"Name", props: {required: true}},
            {key: "title", label:"Title", type: "text"},
            {key: "project", label: "Project", type: "text"},
            {key: "profile", label: "Profile", type: "text "}
          ]}  
          onSubmit = {(model) => {this.onSubmit(model)}}
          />
      

      </div>
    );
  }
}

export default App;
