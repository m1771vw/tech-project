import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
class Dashboard extends Component {
    render() {
        return (
            <div>

                Dashboard place holder page
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