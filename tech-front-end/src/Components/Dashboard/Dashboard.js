import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import AssignmentsTable from '../Assignments/AssignmentsTable';
import {
    getAllAssignmentsBlocked,
    getAllAssignmentsReversed,
    getAllAssignments
} from '../../Redux/Actions';
import { RECENT_ORDER } from '../../Redux/Constants';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';

import LazyLoad from 'react-lazy-load';
import "../../App.css";

class Dashboard extends Component {
    componentDidMount() {
        this.props.getAllAssignmentsBlocked()
        this.props.getAllAssignments()
    }
    render() {
        let { assignments, blockedAssignments } = this.props;
        return (
            <div className='dashboard'>

                <h1>Welcome to your Dashboard</h1>
                <div>
                    <Segment style={{ overflow: 'auto', maxHeight: 400, maxWidth: 1425 }}>

                        <AssignmentsTable showUpdate={true}
                            assignments={blockedAssignments}
                            showProjectName={true}

                            header={"Assignments Needing Attention"} />
                    </Segment>
                </div>
                <div>
                    <Segment style={{ overflow: 'auto', maxHeight: 400, maxWidth: 1425 }}>

                        <AssignmentsTable showUpdate={true}
                            assignments={assignments}
                            showProjectName={true}
                            //   order={RECENT_ORDER}
                            header={"All Assignments"} />
                    </Segment>
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
    getAllAssignments: () => dispatch(getAllAssignments()),

});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);