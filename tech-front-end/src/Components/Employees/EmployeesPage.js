import React, { Component } from 'react';
import { submitEmployee } from '../../Redux/Actions/index';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';



class EmployeesPage extends Component {
    state = {
       employees: []
    }
    componentDidMount() {
        this.fetchAllEmployees();
    }
    
    fetchAllEmployees = () => {

    }
    
    render() {
        return (
            <div className="">

            </div>

        );
    }
}

const mapStateToProps = ({employeeReducer}) => ({
    employees: employeeReducer.employees
})
const  mapDispatchToProps = dispatch => ({
    submitEmployee: employee => dispatch(submitEmployee(employee))
})

// //Double check this
// export default connect(null, mapDispatchToProps)(AddEmployee);
export default connect(mapStateToProps, mapDispatchToProps)(EmployeesPage);