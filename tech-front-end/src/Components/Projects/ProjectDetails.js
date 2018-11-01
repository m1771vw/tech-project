import React, { Component } from 'react';
import ProjectEmployees from './ProjectEmployees';
import {
    getAllProjects, getAllProjectRoles, getProjectById,
    getEmployeesInProject, getAssignmentsInProject, submitAssignment,
    submitEmployee, submitProjectRole, getAllAssignments, deleteAssignment,
    deleteEmployeeFromProject, deleteProjectRole
} from '../../Redux/Actions/index';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"
// import LazyLoad from 'react-lazy-load';
import { Table, Modal, Button, Header, Segment } from 'semantic-ui-react';
import { formatDate } from '../../util/DateHelper'
import ProjectAssignments from './ProjectAssignments';
import AssignmentsTable from '../Assignments/AssignmentsTable';

class ProjectDetails extends Component {
    state = {
        employeeModal: false,
        assignmentModal: false,
    }

    componentDidMount() {
        this.fetchProjectData();
        this.props.getAllAssignments();
    }

    createAssignmentButton = (e) => {
        e.preventDefault()
        this.closeAssignmentModal();
    }

    closeAssignmentModal = () => {
        this.setState({
            assignmentModal: false
        })
    }

    closeEmployeeModal = () => {
        this.setState({
            employeeModal: false
        })
    }

    fetchProjectData = () => {
        this.props.getProjectById(this.props.match.params.id);
        this.props.getEmployeesInProject(this.props.match.params.id);
        this.props.getAssignmentsInProject(this.props.match.params.id);
    }

    onSubmitAssignmentModal = async (model) => {
        model = { ...model, project_id: this.props.match.params.id }
        await this.props.submitAssignment(model);
        await this.fetchProjectData();
        await this.closeAssignmentModal();
        this.setState({
            assignmentModal: false,
        });
    }

    onSubmitEmployeeModal = async (model) => {
        model = { ...model, project_id: this.props.match.params.id }
        await this.props.submitProjectRole(model);
        await this.fetchProjectData();
        await this.closeEmployeeModal();
    }



    render() {
        return (
            <div>
                {/* <Segment style={{ overflow: 'auto', maxHeight: 400, maxWidth: 1425 }}> */}
                <h1>Project Overview
                </h1>
                <Table striped padded color='blue' singleLine>
                    <Table.Header>
                        <h1>{this.props.project_by_id.project_name}</h1>
                        <h5>Start Date: {this.props.project_by_id.project_start_date && formatDate(this.props.project_by_id.project_start_date)}</h5>
                        <h5>End Date: {this.props.project_by_id.project_end_date && formatDate(this.props.project_by_id.project_end_date)}</h5>
                        <Table.Row>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                </Table>
                {/* </Segment> */}
                <Segment style={{ overflow: 'auto', maxHeight: 400, maxWidth: 1425 }}>
                            <h1>Project Employees</h1>
                            {/* PROJECT EMPLOYEES MODAL */}
                            <Modal
                                onClose={this.closeEmployeeModal}
                                open={this.state.employeeModal}
                                trigger={<Button onClick={() => { this.setState({ employeeModal: true }) }}>Add Employee</Button>} closeIcon>
                                <Modal.Header>Add Employee</Modal.Header>
                                <Modal.Content>
                                    <Modal.Description>
                                        <Header>Add Employee To Project</Header>
                                        <ProjectEmployees
                                            onSubmit={this.onSubmitEmployeeModal}
                                        // key={this.props.key}
                                        />
                                        {/* <Dropdown placeholder='Select Employee' fluid search selection options={this.state.dropDown} /> */}
                                    </Modal.Description>
                                </Modal.Content>
                            </Modal>
                    <Table striped padded color='blue' singleLine selectable>
                        <Table.Header>

                            <Table.Row>
                                {/* <Table.HeaderCell>Employee ID</Table.HeaderCell> */}
                                <Table.HeaderCell>Employee Name</Table.HeaderCell>
                                <Table.HeaderCell>Role</Table.HeaderCell>
                                <Table.HeaderCell> </Table.HeaderCell>

                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {this.props.projectEmployees && this
                                .props
                                .projectEmployees
                                .map((e) => {
                                    return (
                                        <Table.Row key={e.employee_id + e.first_name}>
                                            <Table.Cell selectable>
                                                <Link to={`/employees/details/${e.employee_id}`}>
                                                    {e.first_name} {e.last_name}
                                                </Link>
                                            </Table.Cell>
                                            <Table.Cell>{e.role}</Table.Cell>
                                            <Button
                                                color="red"
                                                onClick={() => this.props.deleteProjectRole(e.project_roles_id)}
                                            >
                                                Delete
                                        </Button>
                                        </Table.Row>
                                    );
                                })}
                        </Table.Body>
                    </Table>
                </Segment>

                <Segment style={{ overflow: 'auto', maxHeight: 400, maxWidth: 1425 }}>
                    <h1>Project Assignments</h1>
                    {/* PROJECT ASSIGNMENTS MODAL */}
                    <Modal
                        onClose={this.closeAssignmentModal}
                        open={this.state.assignmentModal}
                        trigger={<Button onClick={() => { this.setState({ assignmentModal: true }) }}>Add Assignment</Button>} closeIcon>
                        <Modal.Header>Create Project Assignments</Modal.Header>
                        <Modal.Content image>
                            <Modal.Description>

                                <ProjectAssignments
                                    onSubmit={this.onSubmitAssignmentModal}
                                />

                            </Modal.Description>
                        </Modal.Content>
                    </Modal>
                    
                    <AssignmentsTable assignments={this.props.projectAssignments}
                        showDates={true}
                        header={""}
                    />
                </Segment>
                
            </div>
        );
    }
}

const mapStateToProps = ({ projectReducer }) => ({
    projects: projectReducer.projects, project_roles: projectReducer.project_roles,
    project_by_id: projectReducer.project_by_id, projectEmployees: projectReducer.projectEmployees,
    projectAssignments: projectReducer.projectAssignments
})

const mapDispatchToProps = dispatch => ({
    getAllProjects: () => dispatch(getAllProjects()),
    getAllProjectRoles: () => dispatch(getAllProjectRoles()),
    getProjectById: (id) => dispatch(getProjectById(id)),
    getEmployeesInProject: (id) => dispatch(getEmployeesInProject(id)),
    getAssignmentsInProject: (id) => dispatch(getAssignmentsInProject(id)),
    submitAssignment: (model) => dispatch(submitAssignment(model)),
    submitProjectRole: (model) => dispatch(submitProjectRole(model)),
    submitEmployee: (model) => dispatch(submitEmployee(model)),
    getAllAssignments: () => dispatch(getAllAssignments()),
    deleteAssignment: (id) => dispatch(deleteAssignment(id)),
    deleteProjectRole: (id) => dispatch(deleteProjectRole(id)),

})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);
