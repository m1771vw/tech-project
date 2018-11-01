import React, { Component } from 'react';
import AssignmentsTable from '../Assignments/AssignmentsTable';
import {
    getAllAssignmentsBlocked,
    getAllAssignmentsReversed,
    getAllAssignments
} from '../../Redux/Actions';
import { connect } from 'react-redux';

class Dashboard extends Component {
    componentDidMount() {
        this.props.getAllAssignmentsBlocked()
        this.props.getAllAssignments()
    }
    render() {
        let { assignments, blockedAssignments } = this.props;
        return (
            <div>
                <h1>Welcome to your Dashboard</h1>
                <div>
                    <AssignmentsTable showUpdate={true}
                        assignments={blockedAssignments}
                        showProjectName={true}
                        header={"Assignments Needing Attention"} />
                </div>
                <div>
                    <AssignmentsTable showUpdate={true}
                        assignments={assignments}
                        showProjectName={true}
                        header={"All Assignments"} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ assignmentReducer }) => ({
    assignments: assignmentReducer.assignments,
    blockedAssignments: assignmentReducer.blockedAssignments,

});

const mapDispatchToProps = dispatch => ({
    getAllAssignmentsBlocked: () => dispatch(getAllAssignmentsBlocked()),
    getAllAssignmentsReversed: () => dispatch(getAllAssignmentsReversed()),
    getAllAssignments: () => dispatch(getAllAssignments()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);