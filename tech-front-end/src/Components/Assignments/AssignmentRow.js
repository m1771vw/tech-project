import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Modal, Tab } from 'semantic-ui-react';
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
            <div></div>
        );
    }
}

AssignmentRow.propTypes = {

};

export default AssignmentRow;