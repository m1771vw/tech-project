import React, { Component } from "react";
// import PropTypes from 'prop-types';
import AssignmentsTable from "../Assignments/AssignmentsTable";
import {
  getAllAssignmentsBlocked,
  getAllEmployeeAssignments,
  getAllAssignmentsReversed,
  getAllAssignments,
  getAllEmployeesHours
} from "../../Redux/Actions";
import LazyLoad from "react-lazy-load";
import { connect } from "react-redux";
import { Icon, Table, Header} from "semantic-ui-react";

class Dashboard extends Component {
 

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
        <LazyLoad>
      <div>
        <h1>Welcome to your Dashboard</h1>
        <div>
                    <AssignmentsTable showUpdate={true} 
                                      assignments={blockedAssignments} 
                                      showProjectName={true}

                                      header={"Assignments Needing Attention"} />
                </div>
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

                <div>
                    <AssignmentsTable showUpdate={true} 
                                      assignments={assignments} 
                                      showProjectName={true}
                                    //   order={RECENT_ORDER}
                                      header={"All Assignments"} />
                </div>

      </div>
      </LazyLoad>
    );
  }
}

// Dashboard.propTypes = {

// };

const mapStateToProps = ({ assignmentReducer, employeeReducer }) => ({
  assignments: assignmentReducer.assignments,
  blockedAssignments: assignmentReducer.blockedAssignments,
  AllEmployeeAssignments: employeeReducer.getAllEmployeeAssignments,
  employeesHours: employeeReducer.getAllEmployeesHours
});

const mapDispatchToProps = dispatch => ({
  getAllAssignmentsBlocked: () => dispatch(getAllAssignmentsBlocked()),
  getAllAssignmentsReversed: id => dispatch(getAllAssignmentsReversed(id)),
  getAllEmployeeAssignments: id => dispatch(getAllEmployeeAssignments(id)),
  getAllAssignments: () => dispatch(getAllAssignments()),
  getAllEmployeesHours:() => dispatch(getAllEmployeesHours())

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
