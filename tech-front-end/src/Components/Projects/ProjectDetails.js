import React, { Component } from 'react';
import Form from '../Forms/DynamicForm/Form';
import ProjectEmployees from './ProjectEmployees';
import projectReducer from '../../Redux/Reducers/Project';
// import AssignmentsPage from '../Assignments/AssignmentsPage';
import {
    getAllProjects, getAllProjectRoles, getProjectById,
    getEmployeesInProject, getAssignmentsInProject, submitAssignment,
    submitEmployee, submitProjectRole, searchEmployees
} from '../../Redux/Actions/index';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazy-load';
import { Table, Modal, Button, Header, Dropdown } from 'semantic-ui-react';
import {formatDate} from '../../util/DateHelper'
import ProjectAssignments from './ProjectAssignments';

class ProjectDetails extends Component {
    state = {
        employeeModal: false,
        assignmentModal: false,
    }

    async componentDidMount() {
        await this.fetchProjectData();
        // await this.searchEmployees
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

    fetchProjectData = async () => {
        await this.props.getProjectById(this.props.match.params.id);
        await this.props.getEmployeesInProject(this.props.match.params.id);
        await this.props.getAssignmentsInProject(this.props.match.params.id);
    }

    onSubmitAssignmentModal = async (model) => {
        
        await this.props.submitAssignment(model);
        await this.fetchProjectData();
        await this.closeAssignmentModal();
        this.setState({
            assignmentModal: false,
        });
    }

    onSubmitEmployeeModal = async (model) => {
        model = {...model, project_id: this.props.match.params.id }
        console.log('MODEL TEST: ', model)
        await this.props.submitProjectRole(model);
        await this.fetchProjectData();
        await this.closeEmployeeModal();
        // this.setState({
        //     employeeModal: false,
        // })
    }



    render() {
        return (
            <div>
                <h1>Project Overview
                </h1>
                <Table singleLine>
                    <Table.Header>
                        <h1>{this.props.project_by_id.project_name}</h1>
                        <h5>Start Date: {this.props.project_by_id.project_start_date && formatDate(this.props.project_by_id.project_start_date)}</h5>
                        <h5>End Date: {this.props.project_by_id.project_end_date && formatDate(this.props.project_by_id.project_end_date)}</h5>
                        <Table.Row>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                </Table>

                <Table singleLine selectable>
                    <Table.Header>
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

                        <Table.Row>
                            <Table.HeaderCell>Employee ID</Table.HeaderCell>
                            <Table.HeaderCell>First Name</Table.HeaderCell>
                            <Table.HeaderCell>Last Name</Table.HeaderCell>
                            <Table.HeaderCell>Position</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.props.projectEmployees && this
                            .props
                            .projectEmployees
                            .map((e) => {
                                return (
                                    <Table.Row key={e.employee_id + e.first_name}>
                                        <Table.Cell>
                                            {e.employee_id}</Table.Cell>
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
                        {/* PROJECT ASSIGNMENTS MODAL */}
                        <Modal
                            onClose={this.closeAssignmentModal}
                            open={this.state.assignmentModal}
                            trigger={<Button onClick={() => { this.setState({ assignmentModal: true }) }}>Add Assignment</Button>} closeIcon>
                            <Modal.Header>Create Project Assignments</Modal.Header>
                            <Modal.Content image>
                                <Modal.Description>
                                    {/* <Header>Add Assignments To Project</Header> */}
                                    {/* <Form className="form"
                                        title=" "
                                        model={[
                                            { key: "assignment_name", label: "Assignment Name", type: "text", props: { required: true } },
                                            { key: "assignment_start_date", label: "Start Date", type: "text", props: { required: true } },
                                            { key: "assignment_end_date", label: "End Date", type: "text", props: { required: true } },
                                            { key: "status_id", label: "Status ID", type: "text", props: { required: true } },
                                            { key: "project_id", label: "Project ID", type: "text", props: { required: true } },
                                            { key: "assignment_est_hours", label: "Estimated Hours", type: "text", props: { required: true } },
                                            { key: "assignment_final_hours", label: "Elapsed Hours", type: "text", props: { required: true } }
                                        ]}
                                        onSubmit={(model) => { this.onSubmitAssignmentModal(model); }}
                                        onDelete={(model) => { this.onDeleteAssignment(model) }}
                                    /> */}
                                    <ProjectAssignments />
                                </Modal.Description>
                            </Modal.Content>
                        </Modal>

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
                        {this.props.projectAssignments && this
                            .props
                            .projectAssignments
                            .map((a) => {
                                return (
                                    <Table.Row key={a.assignment_id + a.assignment_name}>
                                        <Table.Cell>
                                            {a.assignment_name}</Table.Cell>
                                        <Table.Cell>{a.status_name}</Table.Cell>
                                        <Table.Cell>{a.assignment_start_date && formatDate(a.assignment_start_date)}</Table.Cell>
                                        <Table.Cell>{a.assignment_end_date && formatDate(a.assignment_end_date)}</Table.Cell>
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
    submitProjectRole:(model) => dispatch(submitProjectRole(model)),
    submitEmployee: (model) => dispatch(submitEmployee(model)),
    // searchEmployees:() => dispatch(searchEmployees()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);
