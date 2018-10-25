import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
class Dashboard extends Component {
    componentDidMount() {
        console.log("Employee:",this.props.employees && this.props.employees);
    }
    render() {
        return (
            <div>
            { this.props.employees.map((e) => {
                return(
                    <div>{e.first_name} {e.last_name}</div>
                )
            })}
                Dashboard page
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