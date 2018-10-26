import React, { Component } from 'react';
import { getAllEmployees } from '../../Redux/Actions/index';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazy-load';

class EmployeesPage extends Component {
    state = {
       employees: []
    }
    componentDidMount() {
        this.fetchAllEmployees();
    }
    
    fetchAllEmployees = () => {
        this.props.getAllEmployees()
        
    };

    render() {
        let {employees} = this.props

        return (
            <LazyLoad height={100} offsetVertical={300}>
                    <div>
                    <h1>Get Employees</h1>
                  {  employees.map((em) => {
                let employee_id = em.employee_id || "i"
                let first_name = em.first_name;
                let last_name = em.last_name;
                let position = em.position;
            return( 
                <div key = {employee_id} className ="form-group">
                    <label> {employee_id + " "}</label>
                    <label>{first_name + " "}</label>
                    <label>{last_name + " "}</label>
                    <label>{position + " "}</label>
                </div>
            );

       })}
            </div>
            </LazyLoad>

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