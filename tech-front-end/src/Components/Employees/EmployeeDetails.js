// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import {  getEmployeeById, getAssignmentEmployees, getAssignmentById, } from '../../Redux/Actions/';
// import { Button, Table, Header } from 'semantic-ui-react'

// class EmployeeDetails extends Component {
//     async componentDidMount() {
//         await this.fetchEmployeeDetails();
//         console.log("Employee Details: ", this.props.match.params.id);
//     }

//     fetchEmployeeDetails = async () => {
//         await this.props.getEmployeeById(this.props.match.params.id);
//         await this.props.getAssignmentEmployees(this.props.match.params.id);
//     }
//     render() {
//         let {employee, assignment, assignmentEmployees} = this.props
//         let id = employee.employee_id || "Not avail"
//         let first_name = employee.first_name;
//         let last_name = employee.last_name;
//         let position = employee.position;
//         return (
//             <div>
//                 <Header color='blue'>Employee Details Page</Header>
//                 <Header as= 'h2'>Employee ID: {id}</Header>
//                 <Header as= 'h2'>Employee Name: {first_name} {last_name}</Header>
//                 <Header as= 'h2'>Project Name: {assignment.project_name}</Header>
//                 <Header as= 'h2'>Team Members on {assignment.project_name}
//                 {assignmentEmployees.map((a) => {
//                     return(
//                     <div>{a.first_name} {a.last_name}</div>
//                     )})}
//                 </Header>
//                 <Header as= 'h2'>Status: {a.status_name}</Header>
//                 <Header as= 'h2'>Date Started: {a.assignment_start_date}</Header>
//                 <Header as= 'h2'>Date Due: {a.assignment_end_date}</Header>
//                 <Header as= 'h2'>Assignment Estimated Hours: {a.assignment_est_hours}</Header>
//                 <Header as= 'h2'>Assignment Final Elasped Hours: {a.assignment_final_hours}</Header>

//             </div>
//         );
//     }
// }


// const mapStateToProps = ({Reducer}) => ({
//     assignment: Reducer.assignment,
//     assignmentEmployees: Reducer.assignmentEmployees,
//     employee: Reducer.employee

// })

// const mapDispatchToProps = dispatch => ({
//     getEmployeeById: (id) => dispatch(getEmployeeById(id)),
//     getAssignmentById: (id) => dispatch(getAssignmentById(id)),
//     getAssignmentEmployees: (id) => dispatch(getAssignmentEmployees(id))
// })
// export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetails);