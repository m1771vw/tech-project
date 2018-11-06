import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';

class EmployeeCreate extends Component {
    state = {
        first_name:'',
        last_name:'',
        position:''
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
        this.props.onUpdate(this.state, this.props.location.state.project_id)
    }

    onChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value,
            
        })
    }

    renderForm = () => {
        let formUI = (
            <div className="form-group">
                <label className="form-label">First Name</label>
                <input className="form-input"
                    required
                    name="first_name"
                    type="text"
                    value={this.state.first_name}
                    onChange={this.onChange}
                />
                <label className="form-label">Last Name</label>
                <input className="form-input"
                    required
                    name="last_name"
                    type="text"
                    value={this.state.last_name}
                    onChange={this.onChange}
                />
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
        let title = " "  
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
                                </div>
                            </Form.Field>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        )
    }
}
const mapStateToProps = ({ projectReducer }) => ({ 
    // projects: projectReducer.projects
})

const mapDispatchToProps = dispatch => ({
    // tosubmitProject:() => dispatch(submitProject())
})

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeCreate);
