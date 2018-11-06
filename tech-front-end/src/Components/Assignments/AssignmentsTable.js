import React, { Component } from 'react';
import { getAllAssignments, submitAssignment } from '../../Redux/Actions/index';
import { connect } from 'react-redux';
import { Table, Header } from 'semantic-ui-react'
import AssignmentRow from './AssignmentRow'


class AssignmentsTable extends Component {
    state = {
        assignmentModal: false
    }

    determineStatus = (status_name) => {
        switch (status_name) {
            case 'Blocked':
                return 'error';
            case 'Waiting Merge':
                return 'warning';
            case 'Completed' || 'Release':
                return 'positive';
            case 'Not Started':
            default:
                return "";
        }
    };

    closeAssignmentModal = () => {
        this.setState({
            assignmentModal: false
        })
    }

    render() {
        let { assignments, header, showDates, showProjectName } = this.props
        return (
            <div>
                    <div>
                        <Header color='teal'>{header}</Header>

                            <Table striped padded color='teal'  singleLine celled selectable>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Assignment</Table.HeaderCell>
                                        { showProjectName && <Table.HeaderCell>Project Name</Table.HeaderCell> }
                                        <Table.HeaderCell>Assigned To</Table.HeaderCell>                            
                                        <Table.HeaderCell>Status</Table.HeaderCell>
                                        { showDates && <Table.HeaderCell>Start Date</Table.HeaderCell>}
                                        { showDates && <Table.HeaderCell>End Date</Table.HeaderCell> }
                                        <Table.HeaderCell>Estimated Hours</Table.HeaderCell>
                                        <Table.HeaderCell>Final Elapsed Hours</Table.HeaderCell>
                                        <Table.HeaderCell> </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {assignments && assignments.map((a) => {
                                        let assignment_id = a.assignment_id || "Error Assign ID /";
                                        let assignment_name = a.assignment_name || "Error Name /";
                                        return (
                                            <AssignmentRow 
                                                key={assignment_id + assignment_name}
                                                assignment={a}
                                                showProjectName={showProjectName}
                                                order={this.props.order}
                                                showDates={showDates}
                                            />
                                            
                                        );
                                    })}
                                </Table.Body>
                            </Table>

                    </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getAllAssignments: () => dispatch(getAllAssignments()),
    submitAssignment: (model) => dispatch(submitAssignment(model)),

})

export default connect(null, mapDispatchToProps)(AssignmentsTable);
