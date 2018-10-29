import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {
  getEmployeeById,
  getAssignmentEmployees,
  getAssignmentById
} from "../../Redux/Actions/";
import { Header } from "semantic-ui-react";

class EmployeeDetails extends Component {
  async componentDidMount() {
    await this.fetchEmployeeDetails();
    console.log("Employee Details: ", this.props.match.params.id);
  }

  fetchEmployeeDetails = async () => {
    await this.props.getEmployeeById(this.props.match.params.id);
    await this.props.getAssignmentEmployees(this.props.match.params.id);
  };
  render() {
    // let {employee, assignment, assignmentEmployees} = this.props
    // let id = employee.employee_id || "Not avail"
    // let first_name = employee.first_name;
    // let last_name = employee.last_name;
    // let position = employee.position;
    return (
      <div>
        {/* <Header color='blue'>Employee Details Page</Header>
                <Header as= 'h2'>Employee ID: {id}</Header>
                <Header as= 'h2'>Employee Name: {first_name} {last_name}</Header>
                <Header as= 'h2'>Project Name: {assignment.project_name}</Header>
                <Header as= 'h2'>Position: {position}</Header>
                <Header as= 'h2'>Team Members:
                {assignmentEmployees.map((a) => {
                    return(
                    <div>{assignmentEmployees.first_name} {assignmentEmployees.last_name}</div>
                    )})}
                </Header>
                <Header as= 'h2'>Status: {assignmentEmployees.status_name}</Header>
                <Header as= 'h2'>Date Started: {assignmentEmployees.assignment_start_date}</Header>
                <Header as= 'h2'>Date Due: {assignmentEmployees.assignment_end_date}</Header>
                <Header as= 'h2'>Assignment Estimated Hours: {assignmentEmployees.assignment_est_hours}</Header>
                <Header as= 'h2'>Assignment Final Elasped Hours: {assignmentEmployees.assignment_final_hours}</Header> */}
        <h1> ARE YOU WORKING? </h1>
      </div>
    );
  }
}
// EmployeeDetails.propTypes = {

// };

const mapStateToProps = ({ Reducer }) => ({
  assignment: Reducer.assignment,
  assignmentEmployees: Reducer.assignmentEmployees,
  employee: Reducer.employee
});

const mapDispatchToProps = dispatch => ({
  getEmployeeById: id => dispatch(getEmployeeById(id)),
  getAssignmentById: id => dispatch(getAssignmentById(id)),
  getAssignmentEmployees: id => dispatch(getAssignmentEmployees(id))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeDetails);
