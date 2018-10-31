import React, { Component } from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';

class EmployeeEdit extends Component {
    state = {
            first_name: this.props.first_name,
            last_name: this.props.last_name,
            position: this.props.position
    }

    onSubmit = e => {
        e.preventDefault();
        if (this.props.onSubmit) this.props.onSubmit(this.state, this.props.employee_id)
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
        let title = "Employee Edit"  //Or render "default"
        return (    
            <Grid className="form">
            <Grid.Column style={{ maxWidth: 800 }}>
                <Form >
                <Segment stacked>
                <Header color='blue'>{title}</Header>
                <Form.Field  className="dynamic-form" onSubmit={(e) => { this.onSubmit(e) }}>
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

export default EmployeeEdit;
