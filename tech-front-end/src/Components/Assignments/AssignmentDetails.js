import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAssignmentById, getAssignmentEmployees } from '../../Redux/Actions/';
import {formatDate} from '../../util/DateHelper';
import AssignmentsTable from '../Assignments/AssignmentsTable';
class AssignmentDetails extends Component {

    async componentDidMount() {
        await this.fetchAssignmentDetails();
        console.log("Assignment Details: ", this.props.match.params.id);
    }

    async shouldComponentUpdate(prevProps) {
        console.log("AssignmentDetails: Checking if component should update")
        if(prevProps.currentUser !== this.props.currentUser)
        {
            await this.fetchAssignmentDetails();
        }
    }

    fetchAssignmentDetails = async () => {
        await this.props.getAssignmentById(this.props.match.params.id);
        await this.props.getAssignmentEmployees(this.props.match.params.id);
    }
    
    render() {
      
        let {assignment, assignmentEmployees} = this.props
        return (
            <div>
                <h1>Assignment Details Page</h1>
                <AssignmentsTable showDates={true} 
                                  showUpdate={true} 
                                  showProjectName={true}
                                  assignments={[assignment]} 
                                  header={"Recent Updated Assignments"} />
                {/* <h2>Assignment Name: {assignment.assignment_name}</h2>
                <h2>Project Name: {assignment.project_name}</h2> */}
                <h2>Employees on Assignment: 
                {assignmentEmployees.map((a) => {
                    return(
                    <div>{a.first_name} {a.last_name}</div>
                    )})}
                </h2>
                {/* <h2>Status: {assignment.status_name}</h2>
                <h2>Date Started: {assignment.assignment_start_date && formatDate(assignment.assignment_start_date)}</h2>
                <h2>Date Due: {assignment.assignment_end_date && formatDate(assignment.assignment_end_date)}</h2>
                <h2>Assignment Estimated Hours: {assignment.assignment_est_hours}</h2>
                <h2>Assignment Final Elasped Hours: {assignment.assignment_final_hours}</h2> */}
              </div>
        )
}   

  /* render() {
    let { assignment, assignmentEmployees } = this.props;
    return (
      <div>
        <h1>Assignment Details Page</h1>
        <h2>Assignment Name: {assignment.assignment_name}</h2>
        <h2>Project Name: {assignment.project_name}</h2>
        <h2>
          Employees on Assignment:
          {assignmentEmployees.map(a => {
            return (
              <div>
                {assignmentEmployees.first_name} {assignmentEmployees.last_name}
              </div>
            );
          })}
        </h2>
        <h2>Status: {assignment.status_name}</h2>
        <h2>Date Started: {assignment.assignment_start_date}</h2>
        <h2>Date Due: {assignment.assignment_end_date}</h2>
        <h2>Assignment Estimated Hours: {assignment.assignment_est_hours}</h2>
        <h2>
          Assignment Final Elasped Hours: {assignment.assignment_final_hours}
        </h2>
      </div>
    );
  } */
}

// AssignmentDetails.propTypes = {

// };

const mapStateToProps = ({assignmentReducer, loginReducer}) => ({
    assignment: assignmentReducer.assignment,
    assignmentEmployees: assignmentReducer.assignmentEmployees,
    currentUser: loginReducer.currentUser

    
})

const mapDispatchToProps = dispatch => ({
  getAssignmentById: id => dispatch(getAssignmentById(id)),
  getAssignmentEmployees: id => dispatch(getAssignmentEmployees(id))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignmentDetails);
