import React, { Component } from 'react';
import { getAllAssignments } from '../../Redux/Actions/index';
import { connect } from 'react-redux';

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

        return (
            <div className="">
                Hello?
            </div>

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