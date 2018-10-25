import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
class Dashboard extends Component {
    componentDidMount() {
        console.log("Employee:",this.props.employeeData && this.props.employeeData);
    }
    render() {
        return (
            <div>
            { this.props.employeeData.map((e) => {
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
    employeeData: employeeReducer.employeeData
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);