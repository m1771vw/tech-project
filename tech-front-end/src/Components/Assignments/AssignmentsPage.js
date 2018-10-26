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
        this.props.getAllAssignments();
    }

    render() {
        let { assignments } = this.props
        return (
            <div>
                <Link to='/createAssignments'><Button>Create</Button></Link>
            <LazyLoad height={100} offsetVertical={300}>
            <div>
            <Header color='blue'>Assignment List</Header>
                <Table singleLine selectable>
                
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Assignment ID</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Project ID</Table.HeaderCell>
                            <Table.HeaderCell>Status ID</Table.HeaderCell>
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
                                let status_id = a.status_id || "Error Status ID /"
                                let assignment_start_date = a.assignment_start_date || "Error Assign Start /"
                                let assignment_end_date = a.assignment_end_date || "Error Assign End /"
                                let assignment_est_hours = a.assignment_est_hours || "Error Est Hours /"
                                let assignment_final_hours = a.assignment_final_hours || "Error Final Hours /"

                                return (
                                    <Table.Row key={assignment_id}>
                                        <Table.Cell> {assignment_id}</Table.Cell>
                                        <Table.Cell> {assignment_name}</Table.Cell>
                                        <Table.Cell>{project_id}</Table.Cell>
                                        <Table.Cell>{status_id}</Table.Cell>
                                        <Table.Cell>{assignment_start_date}</Table.Cell>
                                        <Table.Cell>{assignment_end_date}</Table.Cell>
                                        <Table.Cell>{assignment_est_hours }</Table.Cell>
                                        <Table.Cell>{assignment_final_hours}</Table.Cell>
                                        <Link to='/update-assignment'><Button>Update</Button></Link>
                                        <Button onClick={() => this.props.deleteAssignment(assignment_id)}>Delete</Button>
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

const mapStateToProps = ({ assignmentReducer }) => ({
    assignments: assignmentReducer.assignments
})

const mapDispatchToProps = dispatch => ({
    getAllAssignments: () => dispatch(getAllAssignments()),
    deleteAssignment: id => dispatch(deleteAssignment(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentsPage);