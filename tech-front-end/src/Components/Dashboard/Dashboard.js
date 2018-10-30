import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import AssignmentsTable from '../Assignments/AssignmentsTable';

import { connect } from 'react-redux';
class Dashboard extends Component {
    render() {
        return (
            <div>

                <h1>Welcome to your Dashboard</h1>
                <AssignmentsTable header={"Recent Assignments"} />

            </div>
        );
    }
}

// Dashboard.propTypes = {

// };

const mapStateToProps = ({employeeReducer}) => ({
    employees: employeeReducer.employees
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);