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
import { formatDate } from '../../util/DateHelper'
import { format } from "url";
import { Link } from "react-router-dom"

class EmployeeDetails extends Component {
  state = {
    getEmployeeByid: {},
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

  calculateTotalEstimatedHours = (typeOfHours) => {
    let { AllEmployeeAssignments } = this.props;
    let totalHours = 0;
    for(let i = 0; i < AllEmployeeAssignments.length; i++) {
        totalHours += parseFloat(AllEmployeeAssignments[i][typeOfHours]);
    }
    return totalHours;
  }

  uniqueProjectNames = () => {
    let { AllEmployeeAssignments } = this.props;
    let name = {};
    for(let i = 0; i < AllEmployeeAssignments.length; i++) {
      name[AllEmployeeAssignments[i].project_name] = AllEmployeeAssignments[i].project_name
      name[AllEmployeeAssignments[i].project_id] = AllEmployeeAssignments[i].project_id
      console.log(name)
    }
    console.log("Look Toward the Sun", name)

  //  return [...new Set(name)]

    }
    
  

  render() {
    let {
      EmployeeById,
      AllEmployeeAssignments,
      AllEmployeesToAssignment
    } = this.props;
  
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
              <Table.HeaderCell>
                From Project
        </Table.HeaderCell>
              <Table.HeaderCell>
                Status
              </Table.HeaderCell>
              <Table.HeaderCell>
                Start Date
        </Table.HeaderCell>
              <Table.HeaderCell>
                Due Date
        </Table.HeaderCell>
              <Table.HeaderCell>
                Total Estimated Hours
        </Table.HeaderCell>
              <Table.HeaderCell>
                Total Elapsed Hours
        </Table.HeaderCell>

            </Table.Header>
            <Table.Body>
              {
                AllEmployeeAssignments.map(ea => {
                  return (
                    <Table.Row key={ea.assignment_id}>
                      <Table.Cell selectable> <Link to={`/assignments/details/${ea.assignment_id}`}>{ea.assignment_name}</Link></Table.Cell>
                      <Table.Cell selectable> <Link to={`/projects/details/${ea.project_id}`}>{ea.project_name && ea.project_name}</Link></Table.Cell>
                      <Table.Cell>{ea.status_name && ea.status_name}</Table.Cell>
                      <Table.Cell>{ea.assignment_start_date && formatDate(ea.assignment_start_date)}</Table.Cell>
                      <Table.Cell>{ea.assignment_end_date && formatDate(ea.assignment_end_date)}</Table.Cell>
                      <Table.Cell>{ea.assignment_est_hours && ea.assignment_est_hours}</Table.Cell>
                      <Table.Cell>{ea.assignment_final_hours && ea.assignment_final_hours}</Table.Cell>
                    </Table.Row>
                  );
                })}
            </Table.Body>
          </Table>

          <Table singleLine selectable>
        <Table.Header>
        <Table.HeaderCell>
          Total Estimated Hours
        </Table.HeaderCell>
        <Table.HeaderCell>
          Total Elapsed Hours
        </Table.HeaderCell>
        </Table.Header>
        <Table.Body>
        <Table.Cell>
          {
            this.calculateTotalEstimatedHours('assignment_est_hours')
          }
        </Table.Cell>
        <Table.Cell>
            {
              this.calculateTotalEstimatedHours('assignment_final_hours')
            }
        </Table.Cell>
          </Table.Body>
        </Table>

        <Table>
          <Table.Header>
          <Table.HeaderCell>Projects {EmployeeById.first_name} is Currently In:</Table.HeaderCell>
          </Table.Header>
          <Table.Body>
            {/* {this.uniqueProjectNames().map(name => {
              return (
                <Table.Row><Table.Cell> <Link to={`/projects/details/${AllEmployeeAssignments.project_id}`}>{name}</Link></Table.Cell></Table.Row>
              )
            })} */}
          </Table.Body>
        </Table>
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
