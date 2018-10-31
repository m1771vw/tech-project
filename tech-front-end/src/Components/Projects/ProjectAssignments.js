import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, Form, Grid, Header, Segment, Dropdown } from 'semantic-ui-react';

class ProjectAssignments extends Component {
    state = {
        role: '',
        employee_id: '',
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state)
        // use action
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

    onInputChange = (e, {value})  => {
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
                <label className="form-label">Select Employee</label>
                <Dropdown 
                placeholder='Status' 
                value={this.state.employee_id}
                onChange={this.onInputChange}
                fluid search selection options={this.props.searchEmployees} />


                <label className="form-label">Assignment</label>
                <input className="form-input"
                    required
                    name="role"
                    type="text"
                    value={this.state.role}
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
