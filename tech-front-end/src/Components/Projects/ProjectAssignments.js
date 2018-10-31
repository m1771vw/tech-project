import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import {searchEmployees} from '../../Redux/Actions/index';
import { Container, Button, Form, Message, Grid, Header, Segment, Dropdown } from 'semantic-ui-react';

class ProjectAssignments extends Component {
    state = {
        first_name: '',
        last_name: '',
        position: '',
        searchEmployees: [{}],
    }

    onSubmit = e => {
        e.preventDefault();
        if (this.props.onSubmit) this.props.onSubmit(this.state, this.props.location.state.employee_id)
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
    //grab the model
    renderForm = () => {
        //loop thorugh all the metadata
        let formUI = (
            <div className="form-group">
                <label className="form-label">Select Employee</label>
                <Dropdown placeholder='Select Employee' fluid search selection options={this.props.searchEmployees} />
                <label className="form-label">Position</label>
                <input className="form-input"
                    required
                    name="position"
                    type="text"
                    value={this.state.position}
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
                            <Header color='blue'>{title}</Header>
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
const mapStateToProps = ({ projectReducer, employeeReducer }) => ({ 
    searchEmployees: employeeReducer.searchEmployees
})

const mapDispatchToProps = dispatch => ({
    // searchEmployees:() => dispatch(searchEmployees()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectAssignments);
