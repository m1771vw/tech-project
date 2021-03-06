import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getStatusTypes } from '../../Redux/Actions/index';
import { Button, Form, Grid, Header, Segment, Dropdown } from 'semantic-ui-react';

class ProjectAssignments extends Component {
    state = {
        assignment_name: '',
        assignment_start_date: '',
        assignment_end_date: '',
        status_id: '',
        project_id: '',
        assignment_est_hours: '',
        assignment_final_hours: '',
        employee_id:'',
    }

    componentDidMount() {
        this.props.getStatusTypes();
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state)
    }

    onDelete = e => {
        e.preventDefault();
        this.props.onDelete(this.state)
    }

    onUpdate = e => {
        e.preventDefault();
        this.props.onUpdate(this.state, this.props.location.state.employee_id)
    }

    onChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onInputChange = (e, { value }) => {
        e.preventDefault();
        this.setState({
            status_id: value
        })
    }

    onInputChange2 = (e, { value }) => {
        e.preventDefault();
        this.setState({
            employee_id: value
        })
    }
    //grab the model
    renderForm = () => {
        //loop thorugh all the metadata
        let formUI = (
            <div className="form-group">
                <label className="form-label">Status</label>
                <Dropdown
                    placeholder='Status'
                    value={this.state.status_id}
                    onChange={this.onInputChange}
                    fluid search selection options={this.props.assignmentStatus} />

                <label className="form-label">Assign to Employee</label>
                <Dropdown
                    placeholder='Employee'
                    value={this.state.employee_id}
                    onChange={this.onInputChange2}
                    fluid search selection options={this.props.searchEmployees} />    


                <label className="form-label">Assignment</label>
                <input className="form-input"
                    required
                    name="assignment_name"
                    type="text"
                    value={this.state.assignment_name}
                    onChange={this.onChange}
                />
                <label className="form-label">Start Date</label>
                <input className="form-input"
                    required
                    name="assignment_start_date"
                    type="text"
                    value={this.state.assignment_start_date}
                    onChange={this.onChange}
                />
                <label className="form-label">End Date</label>
                <input className="form-input"
                    required
                    name="assignment_end_date"
                    type="text"
                    value={this.state.assignment_end_date}
                    onChange={this.onChange}
                />
                <label className="form-label">Estimated Hours</label>
                <input className="form-input"
                    required
                    name="assignment_est_hours"
                    type="text"
                    value={this.state.assignment_est_hours}
                    onChange={this.onChange}
                />
                <label className="form-label">Final Hours</label>
                <input className="form-input"
                    required
                    name="assignment_final_hours"
                    type="text"
                    value={this.state.assignment_final_hours}
                    onChange={this.onChange}
                />

            </div>
        )
        return formUI;
    }
    render() {
        let title = " "  //Or render "default"
        return (
            <Grid className="form">
                <Grid.Column style={{ maxWidth: 800 }}>
                    <Form >
                        <Segment stacked>
                            <Header color='teal'>{title}</Header>
                            <Form.Field className="dynamic-form" onSubmit={(e) => { this.onSubmit(e) }}>
                                {this.renderForm()}
                                <div className="form-group">
                                    <Button primary onClick={(e) => { this.onSubmit(e) }} type="submit">Submit</Button>
                                    {/* /temp button */}
                                </div>
                            </Form.Field>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        )
    }
}
const mapStateToProps = ({ assignmentReducer, employeeReducer }) => ({
    assignmentStatus: assignmentReducer.assignmentStatus,
    searchEmployees: employeeReducer.searchEmployees
})

const mapDispatchToProps = dispatch => ({
    getStatusTypes: () => dispatch(getStatusTypes()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectAssignments);
