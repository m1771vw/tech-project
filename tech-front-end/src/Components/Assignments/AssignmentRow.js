import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Modal, Tab } from 'semantic-ui-react';
import AssignmentEdit from './AssignmentEdit'
import { Link } from 'react-router-dom';
import { formatDate } from '../../util/DateHelper'
import { connect } from 'react-redux';
import { updateAssignment } from '../../Redux/Actions/';

class AssignmentRow extends Component {
    state={
        assignmentModal: false
    }

    closeAssignmentModal = () => {
        this.setState({
            assignmentModal: false
        })
    ;}

    onUpdateAssignmentModal = async (model) =>{
        this.props.updateAssignment(model, this.props.assignment.assignment_id);
        this.closeAssignmentModal();
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
    render() {
        let assignment_id = this.props.assignment.assignment_id
        let assignment_name = this.props.assignment.assignment_name
        let status_name = this.props.assignment.status_name;
        let assignment_start_date = this.props.assignment.assignment_start_date && formatDate(this.props.assignment.assignment_start_date);
        let assignment_end_date = this.props.assignment.assignment_end_date && formatDate(this.props.assignment.assignment_end_date);
        let assignment_est_hours = this.props.assignment.assignment_est_hours;
        let assignment_final_hours = this.props.assignment.assignment_final_hours;
        let project_id = this.props.assignment.project_id;  
        let project_name = this.props.assignment.project_name;
        let status_id = this.props.assignment.status_id;


        return (
            <Table.Row className={this.determineStatus(status_name)} key={assignment_id + assignment_name}>
                <Table.Cell selectable><Link to={`/assignments/details/${assignment_id}`}>{assignment_name}</Link></Table.Cell>
                <Table.Cell selectable><Link to={`/projects/details/${project_id}`}>{project_name}</Link></Table.Cell>
                <Table.Cell>{status_name}</Table.Cell>
                <Table.Cell>{assignment_start_date}</Table.Cell>
                <Table.Cell>{assignment_end_date}</Table.Cell>
                <Table.Cell>{assignment_est_hours}</Table.Cell>
                <Table.Cell>{assignment_final_hours}</Table.Cell>

                <Table.Cell>
                    <Modal
                        onClose={this.closeAssignmentModal}
                        open={this.state.assignmentModal}
                        trigger={<Button color="black" onClick={() => { this.setState({ assignmentModal: true }) }}>Update</Button>} closeIcon>
                        <Modal.Header>Update Assignment</Modal.Header>
                        <Modal.Content>
                            <Modal.Description>
                                <AssignmentEdit onSubmit={this.onUpdateAssignmentModal}
                                    assignment_id={assignment_id}
                                    assignment_name={assignment_name}
                                    status_name={status_name}
                                    assignment_start_date={assignment_start_date}
                                    assignment_end_date={assignment_end_date}
                                    assignment_est_hours={assignment_est_hours}
                                    assignment_final_hours={assignment_final_hours}
                                    project_id={project_id}
                                    status_id={status_id}
                                />
                            </Modal.Description>
                        </Modal.Content>
                    </Modal>
                    <Button color='red' onClick={() => this.props.deleteAssignment(assignment_id)}>Delete</Button>
                </Table.Cell>
            </Table.Row>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateAssignment: (model, id) => dispatch(updateAssignment(model, id))
});

export default connect(null, mapDispatchToProps)(AssignmentRow);