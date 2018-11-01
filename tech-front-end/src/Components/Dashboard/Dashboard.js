import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import AssignmentsTable from '../Assignments/AssignmentsTable';
import {
    getAllAssignmentsBlocked,
    getAllAssignmentsReversed
} from '../../Redux/Actions';
import { RECENT_ORDER } from '../../Redux/Constants';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazy-load';

class Dashboard extends Component {
    componentDidMount() {
        this.props.getAllAssignmentsBlocked()
        this.props.getAllAssignmentsReversed()
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
                                      order={RECENT_ORDER}
                                      header={"Recent Updated Assignments"} />
                </div>
            </div>
        );
    }
}

// Dashboard.propTypes = {

// };

const mapStateToProps = ({ assignmentReducer }) => ({
    assignments: assignmentReducer.assignments,
    blockedAssignments: assignmentReducer.blockedAssignments,

});

const mapDispatchToProps = dispatch => ({
    getAllAssignmentsBlocked: () => dispatch(getAllAssignmentsBlocked()),
    getAllAssignmentsReversed: () => dispatch(getAllAssignmentsReversed()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);