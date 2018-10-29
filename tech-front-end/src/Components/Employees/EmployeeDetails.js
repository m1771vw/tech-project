import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {
  getEmployeeById,
  getAllEmployeesToAssignment,
  getAllEmployeeAssignments
} from "../../Redux/Actions/";
import { Header } from "semantic-ui-react";

class EmployeeDetails extends Component {
  state = {
    employee_by_id: [],
    getAllemployeeAssignments: [],
    allEmployeeToAssignment: []
  };

  async componentDidMount() {
    await this.getAllEmployeesToAssignment();
    await this.getEmployeeById();
    await this.getEmployeeAssignment();
  }
  fetchEmployeeById = async () => {
    await this.props.getEmployeeById();
  };

  getAllEmployeesToAssignment = async () => {
    await this.props.getAllEmployeesToAssignment();
  };

  getEmployeeAssignment = async () => {
    await this.props.getEmployeeAssignment();
  };
  render() {
    let {
      employee_by_id,
      employeeAssignments,
      allEmployeeToAssignment
    } = this.props;

    console.log("hello Employees", this.props);
    return (
      <div>
        <Header color="blue">Employee Details Page</Header>
        <Header as="h2">Employee ID: {employee_by_id}</Header>
        <Header as="h2">
          Employee Name: {employee_by_id.first_name} {employee_by_id.last_name}
        </Header>

        <Header as="h2">
          Team Roster:
          {employeeAssignments.map(a => {
            return (
              <div>
                {employeeAssignments.first_name} {employeeAssignments.last_name}
              </div>
            );
          })}
        </Header>
        <Header as="h2">Status: {employeeAssignments.status_name}</Header>
        <Header as="h2">
          Date Started: {employeeAssignments.assignment_start_date}
        </Header>
        <Header as="h2">
          Date Due: {employeeAssignments.assignment_end_date}
        </Header>
        <Header as="h2">
          Assignment Estimated Hours: {employeeAssignments.assignment_est_hours}
        </Header>
        <Header as="h2">
          Assignment Final Elasped Hours:{" "}
          {employeeAssignments.assignment_final_hours}
        </Header>

        <Header as="h2">
          Team Members:
          {allEmployeeToAssignment.map(a => {
            return (
              <div>
                {allEmployeeToAssignment.first_name}{" "}
                {allEmployeeToAssignment.last_name}
              </div>
            );
          })}
        </Header>
      </div>
    );
  }
}
// EmployeeDetails.propTypes = {

// };

const mapStateToProps = ({ employeeReducer }) => ({
  employee_by_id: employeeReducer.employee_by_id,
  employeeAssignment: employeeReducer.getAllEmployeeAssignments,
  allEmployeeToAssignment: employeeReducer.getAllEmployeesToAssignment
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
