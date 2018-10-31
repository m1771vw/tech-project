import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Modal } from 'semantic-ui-react';
import AssignmentEdit from './AssignmentEdit'
import { Link } from 'react-router-dom';
import { formatDate } from '../../util/DateHelper'

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
        model = {...model, assignment_id: this.props.assignment_id }
        await this.props.updateAssignment(model);
        this.closeAssignmentModal();
      }

    render() {
        let assignment_id = this.props.assignment.assignment_id
        let assignment_name = this.props.assignment.assignment_name
        let status_name = this.props.assignment.status_name || "i";
        let assignment_start_date = this.props.assignment.assignment_start_date;
        let assignment_end_date = this.props.assignment.assignment_end_date;
        let assignment_est_hours = this.props.assignment.assignment_est_hours;
        let assignment_final_hours = this.props.assignment.assignment_final_hours;
        let project_id = this.props.assignment.project_id;  
        let project_name = this.props.assignment.project_name;


        return (
            <tr className={this.determineStatus(status_name)} key={assignment_id + assignment_name}>
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
                            assignment_id = {assignment_id}
                            assignment_name = {assignment_name}
                            status_name = {status_name}
                            assignment_start_date ={assignment_start_date}
                            assignment_end_date ={assignment_end_date}
                            assignment_est_hours = {assignment_est_hours}
                            assignment_final_hours = {assignment_final_hours}
                        />
                    </Modal.Description>
                </Modal.Content>
            </Modal>
                <Button color='red' onClick={() => this.props.deleteAssignment(assignment_id)}>Delete</Button>
            </Table.Cell>
        </tr>
        );
    }
}

AssignmentRow.propTypes = {

};

export default AssignmentRow;