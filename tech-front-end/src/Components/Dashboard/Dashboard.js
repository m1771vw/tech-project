import React, { Component } from 'react';
import AssignmentsTable from '../Assignments/AssignmentsTable';
import {
  getAllAssignmentsBlocked,
  getAllEmployeeAssignments,
  getAllAssignmentsReversed,
  getAllAssignments,
  getAllEmployeesHours
} from "../../Redux/Actions";
import { connect } from "react-redux";
import { Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Icon, Table, Header} from "semantic-ui-react";
import "../../App.css";

class Dashboard extends Component {
    state = {
        getAllemployeeAssignments: []
      }
  componentDidMount() {
    this.props.getAllAssignmentsBlocked();
    this.props.getAllAssignments();
    this.fetchAllEmployeeAssignments();
    this.fetchAllEmployeesHours();
}

  fetchAllEmployeesHours = () =>{
    this.props.getAllEmployeesHours();

  }

  fetchAllEmployeeAssignments = () => {
    this.props.getAllEmployeeAssignments(1);
  };

  overHours = (arr) => {
    
    let overTime = [];
    // if(employeesHours !== undefined) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].assignment_final_hours > arr[i].assignment_est_hours) {
            overTime.push(arr[i]);
          }
        }
    // }
    return overTime;
  };

  checkIfIdExists = (arr, id) => {
    var found = arr.some(x => {
      return x.employee_id === id
    })
    return found;
  }
  
  addHoursTogether = (arr) => {
    let newArr = [];
    for(let i = 0; i < arr.length; i++) {
      if(this.checkIfIdExists(newArr, arr[i].employee_id)) {
        
        let indexOfPerson = newArr.findIndex(x => x.employee_id === arr[i].employee_id)
        newArr[indexOfPerson].assignment_est_hours = parseFloat(newArr[indexOfPerson].assignment_est_hours) + parseFloat(arr[i].assignment_est_hours)
        newArr[indexOfPerson].assignment_final_hours = parseFloat(newArr[indexOfPerson].assignment_final_hours) + parseFloat(arr[i].assignment_final_hours)
      } else {
        newArr.push(arr[i])
      }
    }
    console.log("New Arr: ", newArr);
    return newArr
  }

  render() {
      
    let {
      assignments,
      blockedAssignments,
      AllEmployeeAssignments,
      employeesHours
    } = this.props;

    console.log("LOOK FOR THIS", employeesHours)

    return (
        <div className='dashboard'>


        <h1>Welcome to your Dashboard</h1>
        <div>
            <Segment style={{ overflow: 'auto', maxHeight: 400, maxWidth: 1425 }}>
                <AssignmentsTable showUpdate={true}
                    assignments={blockedAssignments}
                    showProjectName={true}
                    header={"Assignments Needing Attention"} />
            </Segment>
        </div>
        <Segment style={{ overflow: 'auto', maxHeight: 400, maxWidth: 1425 }}>
   
        <Header header = 'h2' color ='teal'>Over Time</Header>
        <Table striped padded color='teal'  singleLine celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Employee Name</Table.HeaderCell>
              <Table.HeaderCell>Total Estimated Assigned Hours </Table.HeaderCell>
              <Table.HeaderCell>Total Accrued Hours</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
                employeesHours && this.overHours(this.addHoursTogether(employeesHours)).map(ea => {
                   
              return (
                <Table.Row error>
                  <Table.Cell key={ea.id} selectable><Link to={`/employees/details/${ea.id}`}>{ea.first_name} {ea.last_name}</Link></Table.Cell>
                  <Table.Cell>{ea.assignment_est_hours}</Table.Cell>
                  <Table.Cell >{ea.assignment_final_hours}</Table.Cell>
                
                </Table.Row>
              );
            })
            }
          </Table.Body>
        </Table>
        </Segment>


        <div>
            <Segment style={{ overflow: 'auto', maxHeight: 400, maxWidth: 1425 }}>
                <AssignmentsTable showUpdate={true}
                    assignments={assignments}
                    showProjectName={true}
                    header={"All Assignments"} />
            </Segment>
        </div>
      </div>
    
    );
  }
}

const mapStateToProps = ({ assignmentReducer, employeeReducer }) => ({
  assignments: assignmentReducer.assignments,
  blockedAssignments: assignmentReducer.blockedAssignments,
  AllEmployeeAssignments: employeeReducer.getAllEmployeeAssignments,
  employeesHours: employeeReducer.getAllEmployeesHours
});

const mapDispatchToProps = dispatch => ({
  getAllAssignmentsBlocked: () => dispatch(getAllAssignmentsBlocked()),
  getAllAssignmentsReversed: () => dispatch(getAllAssignmentsReversed()),
  getAllEmployeeAssignments: id => dispatch(getAllEmployeeAssignments(id)),
  getAllAssignments: () => dispatch(getAllAssignments()),
  getAllEmployeesHours:() => dispatch(getAllEmployeesHours())

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
