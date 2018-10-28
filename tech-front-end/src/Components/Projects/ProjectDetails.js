import React, { Component } from 'react';
import projectReducer from '../../Redux/Reducers/Project';
// import AssignmentsPage from '../Assignments/AssignmentsPage';
import { 
    getAllProjects, getAllProjectRoles, getProjectById, 
    getEmployeesInProject, getAssignmentsInProject 
} from '../../Redux/Actions/index';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazy-load';
import { Table } from 'semantic-ui-react';

class ProjectDetails extends Component {
    state = {

    }

    async componentDidMount() {
        await this.fetchProjectById();
        await this.fetchEmployees();
        await this.fetchAssignments();
    }


    fetchProjectById = async () => {
        await this.props.getProjectById();
    }

    fetchEmployees = async () => {
        await this.props.getEmployeesInProject();
    }

    fetchAssignments = async () => {
        await this.props.getAssignmentsInProject();
    }


    render() {
        return (
            <div>
                <h1>Project Overview </h1>
                <Table singleLine>
                    <Table.Header>
                        <h1>{this.props.project_by_id.project_name}</h1>
                        <h5>Start Date: {this.props.project_by_id.project_start_date}</h5>
                        <h5>End Date: {this.props.project_by_id.project_end_date}</h5>
                        <Table.Row>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                </Table>

                <Table singleLine selectable>
                    <Table.Header>
                        <h1>Project Employees</h1>
                        <Table.Row>
                            <Table.HeaderCell>Employee ID</Table.HeaderCell>
                            <Table.HeaderCell>First Name</Table.HeaderCell>
                            <Table.HeaderCell>Last Name</Table.HeaderCell>
                            <Table.HeaderCell>Position</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.props.projectEmployees &&
                            this.props.projectEmployees.map((e) => {
                                return (
                                    <Table.Row key={e.employee_id + e.first_name}>
                                        <Table.Cell> {e.employee_id}</Table.Cell>
                                        <Table.Cell>{e.first_name}</Table.Cell>
                                        <Table.Cell>{e.last_name}</Table.Cell>
                                        <Table.Cell>{e.position}</Table.Cell>
                                    </Table.Row>
                                );
                            })}
                    </Table.Body>
                </Table>

                <Table singleLine selectable>
                    <Table.Header>
                        <h1>Project Assignments</h1>
                        <Table.Row>
                            <Table.HeaderCell>Assignment</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell>Start Date</Table.HeaderCell>
                            <Table.HeaderCell>End Date</Table.HeaderCell>
                            <Table.HeaderCell>Estimated Hours</Table.HeaderCell>
                            <Table.HeaderCell>Final Hours</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.props.projectAssignments &&
                            this.props.projectAssignments.map((a) => {
                                return (
                                    <Table.Row key={a.assignment_id + a.assignment_name}>
                                        <Table.Cell> {a.assignment_name}</Table.Cell>
                                        <Table.Cell>{a.status_name}</Table.Cell>
                                        <Table.Cell>{a.assignment_start_date}</Table.Cell>
                                        <Table.Cell>{a.assignment_end_date}</Table.Cell>
                                        <Table.Cell>{a.assignment_est_hours}</Table.Cell>
                                        <Table.Cell>{a.assignment_final_hours}</Table.Cell>
                                    </Table.Row>
                                );
                            })}
                    </Table.Body>
                </Table>
            

            </div>
        );
    }
}


const mapStateToProps = ({ projectReducer }) => ({
    projects: projectReducer.projects,
    project_roles: projectReducer.project_roles,
    project_by_id: projectReducer.project_by_id,
    projectEmployees: projectReducer.projectEmployees,
    projectAssignments: projectReducer.projectAssignments

})

const mapDispatchToProps = dispatch => ({
    getAllProjects: () => dispatch(getAllProjects()),
    getAllProjectRoles: () => dispatch(getAllProjectRoles()),
    getProjectById: () => dispatch(getProjectById()),
    getEmployeesInProject: () => dispatch(getEmployeesInProject()),
    getAssignmentsInProject: () => dispatch(getAssignmentsInProject()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);