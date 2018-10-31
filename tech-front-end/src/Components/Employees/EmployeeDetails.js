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
    for (let i = 0; i < AllEmployeeAssignments.length; i++) {
      totalHours += parseFloat(AllEmployeeAssignments[i][typeOfHours]);
    }
    return totalHours;
  }

  uniqueProjectNames = () => {
    let { AllEmployeeAssignments } = this.props;
    let name = [];
    for (let i = 0; i < AllEmployeeAssignments.length; i++) {
      let newObj = {};
      newObj.project_id = AllEmployeeAssignments[i].project_id;
      newObj.project_name = AllEmployeeAssignments[i].project_name;
      if(!name.some(o => o['project_id'] === AllEmployeeAssignments[i].project_id))
        name.push(newObj) 
    }
    return name;
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
            <Table.Header>
              <Table.Row>
              <Table.HeaderCell>Employee Name: {EmployeeById.first_name + " "}{EmployeeById.last_name}</Table.HeaderCell>
              <Table.HeaderCell>Position: {EmployeeById.position}</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
          </Table>

          <Table singleLine selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>All Assignments Assigned to {EmployeeById.first_name}:</Table.HeaderCell>
                <Table.HeaderCell>From Project</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Start Date</Table.HeaderCell>
                <Table.HeaderCell>Due Date</Table.HeaderCell>
                <Table.HeaderCell>Total Estimated Hours</Table.HeaderCell>
                <Table.HeaderCell>Total Elapsed Hours</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {
                AllEmployeeAssignments.map(ea => {
                  return (
                    <Table.Row key={ea.assignment_id+ea.assignment_name}>
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
              <Table.Row>
                <Table.HeaderCell>Total Estimated Hours</Table.HeaderCell>
                <Table.HeaderCell>Total Elapsed Hours</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row>
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
              </Table.Row>
            </Table.Body>
          </Table>

          <Table>
            <Table.Header>
                <Table.Row>
                 <Table.HeaderCell>Projects {EmployeeById.first_name} is Currently In:</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.uniqueProjectNames().map(name => {
              return (
                <Table.Row>
                  <Table.Cell selectable> 
                     <Link to={`/projects/details/${name.project_id}`}>{name.project_name}</Link>
                  </Table.Cell>
               </Table.Row>
              )
            })}
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
