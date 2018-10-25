import React, { Component } from 'react';
import { getAllEmployees } from '../../Redux/Actions/index';
import { connect } from 'react-redux';

class EmployeesPage extends Component {
    state = {
       employees: []
    }
    componentDidMount() {
        console.log("Trying to fetch all employees");
        this.fetchAllEmployees();
    }
    
    fetchAllEmployees = () => {
        this.props.getAllEmployees();
    }

    render() {

        return (
            <div className="">
                Hello?
            </div>

        );
    }
}

const mapStateToProps = ({employeeReducer}) => ({
    employees: employeeReducer.employees
})

const  mapDispatchToProps = dispatch => ({
    getAllEmployees: () => dispatch(getAllEmployees())
})

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesPage);