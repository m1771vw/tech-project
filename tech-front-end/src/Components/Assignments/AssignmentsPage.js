import React, { Component } from 'react';
import { getAllAssignments, deleteAssignment } from '../../Redux/Actions/index';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazy-load'
import { Button, Table, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class AssignmentsPage extends Component {
    state = {
        assignments: []
    }
    componentDidMount() {
        console.log("Trying to fetch all assignments");
        this.fetchAllAssignments();
    }

    fetchAllAssignments = () => {
        this.props.getAllAssignments(this.props.token);
    }

    render() {
        let { assignments } = this.props
        return (
            <div>
                <Link to='/createAssignments'><Button primary>Create</Button></Link>
            <LazyLoad height={100} offsetVertical={300}>
            <div>
            <Header color='blue'>Assignment List</Header>
                <Table singleLine celled>
                
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Assignment ID</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Project Name</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell>Start Date</Table.HeaderCell>
                            <Table.HeaderCell>End Date</Table.HeaderCell>
                            <Table.HeaderCell>Estimated Hours</Table.HeaderCell>
                            <Table.HeaderCell>Final Elapsed Hours</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>

                            {assignments.map((a) => {
                                let assignment_id = a.assignment_id || "Error Assign ID /"
                                let assignment_name = a.assignment_name || "Error Name /"
                                let project_id = a.project_id || "Error Project ID /"
                                let project_name = a.project_name || "Error Project ID /"
                                let status_id = a.status_id || "Error Status ID /"
                                let status_name = a.status_name || "Error Status ID /"
                                let assignment_start_date = a.assignment_start_date || "Error Assign Start /"
                                let assignment_end_date = a.assignment_end_date || "Error Assign End /"
                                let assignment_est_hours = a.assignment_est_hours || "Error Est Hours /"
                                let assignment_final_hours = a.assignment_final_hours || "Error Final Hours /"

                                return (
                                    <Table.Row key={assignment_id+assignment_name}>
                                        <Table.Cell> {assignment_id}</Table.Cell>
                                        <Table.Cell selectable> <Link to={`/assignments/details/${assignment_id}`}>{assignment_name}</Link></Table.Cell>
                                        <Table.Cell>{project_name}</Table.Cell>
                                        <Table.Cell>{status_name}</Table.Cell>
                                        <Table.Cell>{assignment_start_date}</Table.Cell>
                                        <Table.Cell>{assignment_end_date}</Table.Cell>
                                        <Table.Cell>{assignment_est_hours }</Table.Cell>
                                        <Table.Cell>{assignment_final_hours}</Table.Cell>
                                        <Table.Cell>
                                        <Link to={{
                                            pathname:'/update-assignment',
                                            state:{ 
                                                assignment_name: assignment_name,
                                                assignment_start_date: assignment_start_date,
                                                assignment_end_date: assignment_end_date,
                                                assignment_est_hours: assignment_est_hours,
                                                assignment_final_hours: assignment_final_hours,
                                            }}}><Button secondary>Update</Button></Link>
                                        <Button color='red' onClick={() => this.props.deleteAssignment(assignment_id)}>Delete</Button>
                                        </Table.Cell>
                                    </Table.Row>
                                    );
                            })}
                        </Table.Body>
                    </Table>
                    </div>
                </LazyLoad>
            </div>
        );
    }
}

const mapStateToProps = ({ assignmentReducer, loginReducer }) => ({
    assignments: assignmentReducer.assignments,
    token: loginReducer.token
})

const mapDispatchToProps = dispatch => ({
    getAllAssignments: (token) => dispatch(getAllAssignments(token)),
    deleteAssignment: id => dispatch(deleteAssignment(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentsPage);