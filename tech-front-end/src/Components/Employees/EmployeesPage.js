import React, { Component } from 'react';
import { getAllEmployees } from '../../Redux/Actions/index';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazy-load';
import { Table, Header } from 'semantic-ui-react'

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
        let { employees } = this.props

        return (
            <LazyLoad height={100} offsetVertical={300}>
            <div>
                <Header color='blue'>Employee Roster</Header>
                <Table singleLine selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Employee ID</Table.HeaderCell>
                            <Table.HeaderCell>First Name</Table.HeaderCell>
                            <Table.HeaderCell>Last Name</Table.HeaderCell>
                            <Table.HeaderCell>Position</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>

                        {   
                            employees.map((em) => {
                            let employee_id = em.employee_id || "i"
                            let first_name = em.first_name;
                            let last_name = em.last_name;
                            let position = em.position;
                            return (
                                
                               
                                <Table.Row key={employee_id}>
                                    <Table.Cell> {employee_id}</Table.Cell>
                                    <Table.Cell>{first_name}</Table.Cell>
                                    <Table.Cell>{last_name}</Table.Cell>
                                    <Table.Cell>{position}</Table.Cell>
                                </Table.Row>
                             

                            );
                                
                        })}
                    </Table.Body>
                </Table>
            </div>
            </LazyLoad>

        );
    }
}

const mapStateToProps = ({ employeeReducer }) => ({
    employees: employeeReducer.employees
})

const mapDispatchToProps = dispatch => ({
    getAllEmployees: () => dispatch(getAllEmployees())
})

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesPage);