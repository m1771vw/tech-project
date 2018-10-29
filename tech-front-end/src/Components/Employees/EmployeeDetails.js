import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {
  getEmployeeById,
  getAllEmployeesToAssignment,
  getAllEmployeeAssignments
} from "../../Redux/Actions/";
import LazyLoad from "react-lazy-load";
import { Header } from "semantic-ui-react";
import { Table } from "semantic-ui-react"

class EmployeeDetails extends Component {
  state = {
    getEmployeeByid:{} ,
    getAllemployeeAssignments: [],
    getAllEmployeesToAssignment: []
  };

  async componentDidMount() {
    await this.fetchAllEmployeesToAssignment();
    await this.fetchEmployeeById();
    await this.fetchAllEmployeeAssignments();
  }
  fetchEmployeeById = async () => {
    await this.props.getEmployeeById(this.props.match.params.id);
  };

  fetchAllEmployeesToAssignment = async () => {
    await this.props.getAllEmployeesToAssignment(this.props.match.params.id);
  };

  fetchAllEmployeeAssignments = async () => {
    await this.props.getAllEmployeeAssignments(this.props.match.params.id);
  };
  render() {
    let {
      EmployeeById,
      AllEmployeeAssignments,
      AllEmployeesToAssignment
    } = this.props;
 console.log(AllEmployeesToAssignment)
    return (
      <LazyLoad>
      <div>
        <Header color="blue">Employee Details Page</Header>
        <Table singleLine>
        <Table.Row>
        <Table.HeaderCell />
        </Table.Row>
        <Table.Header>
        <Header as="h3">Employee Name: {EmployeeById.first_name + " "}{EmployeeById.last_name}</Header>
        <Header as="h3">Position: {EmployeeById.position}</Header>
        </Table.Header>
        </Table>
        
        <Table singleLine Selectable>
        <Table.Header>
        <Table.HeaderCell>
          All Assignments Assigned to {EmployeeById.first_name}:
        </Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          {
            AllEmployeeAssignments.map(ea => {
            return (
              <Table.Row key = {ea.assignment_id}>
                <Table.Cell>Assignments: {ea.assignment_name}</Table.Cell>
              </Table.Row>
            );
          })}
          </Table.Body>
        </Table>
        
        {/* <Table singleLine selectable>
        <Table.Header>
        <Table.HeaderCell>
          Additional Team Members on Assignment {AllEmployeesToAssignment.assignment_name}
        </Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          {AllEmployeesToAssignment.map(a => {
            return (
              <Table.Row>
              
              <Table.Cell>Team Member:{a.first_name}{" "}
                {a.last_name}</Table.Cell>
              </Table.Row>
            );
          })}
          </Table.Body>
        </Table> */}
      </div>
      </LazyLoad>
    );
  }
}
// EmployeeDetails.propTypes = {

// };

const mapStateToProps = ({ employeeReducer }) => ({
  Employees: employeeReducer.employees,
  EmployeeById: employeeReducer.getEmployeeById,
  AllEmployeeAssignments: employeeReducer.getAllEmployeeAssignments,
  AllEmployeesToAssignment: employeeReducer.getAllEmployeesToAssignment
});

const mapDispatchToProps = dispatch => ({
  getEmployeeById: id => dispatch(getEmployeeById(id)),
  getAllEmployeeAssignments: id => dispatch(getAllEmployeeAssignments(id)),
  getAllEmployeesToAssignment: id => dispatch(getAllEmployeesToAssignment(id))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeDetails);
