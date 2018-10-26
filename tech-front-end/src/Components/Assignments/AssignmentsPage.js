import React, { Component } from 'react';
import { getAllAssignments } from '../../Redux/Actions/index';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazy-load'

class AssignmentsPage extends Component {
    state = {
       assignments: []
    }
    componentDidMount() {
        console.log("Trying to fetch all assignments");
        this.fetchAllAssignments();
    }
    
    fetchAllAssignments = () => {
        this.props.getAllAssignments();
    }

    render() {
        let {assignments} = this.props
        return (
            <LazyLoad height={100} offsetVertical={300}>
            <div>
            <h1>Get Assignment</h1>
          {assignments.map((a) => {
        let assignment_id= a.assignment_id || "Error Assign ID /"
        let assignment_name = a.assignment_name || "Error Name /"
        let project_id = a.project_id || "Error Project ID /"
        let status_id = a.status_id || "Error Status ID /"
        let assignment_start_date = a.assignment_start_date || "Error Assign Start /"
        let assignment_end_date = a.assignment_end_date || "Error Assign End /"
        let assignment_est_hours = a.assignment_est_hours || "Error Est Hours /"
        let assignment_final_hours = a.assignment_final_hours || "Error Final Hours /"

    return( 
        <div key = {assignment_id } className ="form-group">
            <label> {assignment_id + " "}</label>
            <label> {assignment_name + " "}</label>
            <label>{project_id + " "}</label>
            <label>{status_id + " "}</label>
            <label>{assignment_start_date + " "}</label>
            <label>{assignment_end_date + " "}</label>
            <label>{assignment_est_hours + " "}</label>
            <label>{assignment_final_hours + " "}</label>
        </div>
        );

    })} 

    </div>
    </LazyLoad>
        );
    }
}

const mapStateToProps = ({assignmentReducer}) => ({
    assignments: assignmentReducer.assignments
})

const  mapDispatchToProps = dispatch => ({
    getAllAssignments: () => dispatch(getAllAssignments())
})

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentsPage);