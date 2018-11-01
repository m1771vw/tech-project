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
  overHours = () => {
    let { AllEmployeeAssignments } = this.props;
    let overTime = [];

    for (let i = 0; i < AllEmployeeAssignments.length; i++) {
      if (AllEmployeeAssignments[i].assignment_final_hours > AllEmployeeAssignments[i].assignment_est_hours) {
        overTime.push(AllEmployeeAssignments[i]);
      }
    }
    return overTime;
  };

  calculateTotalEstimatedHours = (typeOfHours) => {
    let { AllEmployeeAssignments } = this.props;
    let totalHours = 0;
    for (let i = 0; i < AllEmployeeAssignments.length; i++) {
      totalHours += parseFloat(AllEmployeeAssignments[i][typeOfHours]);
    }
    return totalHours;
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

        <Header header = 'h2' color ='blue'>Over Time</Header>
        <Table selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Assignment Name</Table.HeaderCell>
              <Table.HeaderCell>Employee on Assignment</Table.HeaderCell>
              <Table.HeaderCell>Assignment Elapsed Hours</Table.HeaderCell>
              <Table.HeaderCell>Assignment Estimated Hours</Table.HeaderCell>
              <Table.HeaderCell>Total Hours Put In</Table.HeaderCell>
              <Table.HeaderCell>Total Booked Hours</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
                this.overHours(AllEmployeeAssignments).map(ea => {
              return (
                <Table.Row error>
                  <Table.Cell key={ea.assignment_id}>
                    {ea.assignment_name}
                  </Table.Cell>
                  <Table.Cell>{ea.first_name} {ea.last_name}</Table.Cell>
                  <Table.Cell ><Icon name='attention' />{ea.assignment_final_hours}</Table.Cell>
                  <Table.Cell>{ea.assignment_est_hours}</Table.Cell>
                  <Table.Cell>{
                    this.calculateTotalEstimatedHours('assignment_final_hours')
                  }</Table.Cell>
                  <Table.Cell>{
                    this.calculateTotalEstimatedHours('assignment_est_hours')
                  }</Table.Cell>
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
