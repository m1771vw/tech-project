import React, { Component } from 'react';
import { getAllAssignments, getAllAssignmentsOrdered, getAllAssignmentsReversed, deleteAssignment, updateAssignment, submitAssignment } from '../../Redux/Actions/index';
import { IN_ORDER, RECENT_ORDER, NEED_ATTENTION } from '../../Redux/Constants/';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazy-load'
import { Modal, Button, Table, Header, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { formatDate } from '../../util/DateHelper'
import AssignmentEdit from './AssignmentEdit'
import AssignmentRow from './AssignmentRow'


class AssignmentsTable extends Component {
    state = {
        assignmentModal: false,

    }

    // componentDidMount() {
    //     this.fetchAllAssignments()
    // }

    // //Added Below to temporarily work
    // fetchAllAssignments = async () => {
    //     await this.props.getAllAssignments()

    // }

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

    // onSubmitAssignmentModal = async (model) => {
    //     model = { ...model, assignment_id: this.props.match.params.id }
    //     await this.props.submitAssignment(model);
    //     await this.fetchAllAssignments();
    //     await this.closeAssignmentModal();
    //     this.setState({
    //         assignmentModal: false,
    //     });
    // }

    // onUpdateAssignmentModal = async (model) => {
    //     model = { ...model }
    //     await this.props.updateAssignment(model);
    //     await this.fetchAllAssignments();
    //     await this.closeAssignmentModal();
    //     this.setState({
    //         assignmentModal: false,
    //     });
    // }



    render() {
        let { assignments, header, showUpdate, showDates, showProjectName } = this.props
        // this.sortAssignments(this.props.sortOrder)
        return (
            <div>
                {/* <LazyLoad height={300} offsetVertical={200}> */}
                    <div>
                        <Header color='blue'>{header}</Header>
                            <Segment style={{overflow: 'auto', maxHeight: 400, maxWidth:1425 }}>

                            <Table color='blue'  singleLine celled selectable>
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
                                                // onSubmit={this.onUpdateAssignmentModal}
                                                showDates={showDates}
                                            />
                                            
                                        );
                                    })}
                                </Table.Body>
                            </Table>

                        </Segment>  
                    </div>
                {/* </LazyLoad> */}
            </div>
        );
    }
}

const mapStateToProps = ({ assignmentReducer }) => ({
    // assignments: assignmentReducer.assignments,
    // reversedAssignments: assignmentReducer.reversedAssignments
})

const mapDispatchToProps = dispatch => ({
    getAllAssignments: () => dispatch(getAllAssignments()),
    submitAssignment: (model) => dispatch(submitAssignment(model)),
    // deleteAssignment: id => dispatch(deleteAssignment(id)),
    // updateAssignment: (model, id, order) => dispatch(updateAssignment(model, id, order))
})

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentsTable);
