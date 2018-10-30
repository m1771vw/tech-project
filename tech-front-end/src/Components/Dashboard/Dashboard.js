import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import AssignmentsTable from '../Assignments/AssignmentsTable';
import { RECENT_ORDER } from '../../Redux/Constants';
import { connect } from 'react-redux';
class Dashboard extends Component {
    render() {
        let { assignments } = this.props;
        return (
            <div>

                <h1>Welcome to your Dashboard</h1>
                <AssignmentsTable assignments={assignments} header={"Recent Updated Assignments"} sortOrder={RECENT_ORDER}/>

            </div>
        );
    }
}

// Dashboard.propTypes = {

// };

const mapStateToProps = ({assignmentReducer}) => ({
    assignments: assignmentReducer.assignments
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);