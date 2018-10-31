import React, { Component } from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';

class ProjectEdit extends Component {
    state = {
        // project_id: this.props.project_id,
        project_name: this.props.project_name,
        project_start_date: this.props.project_start_date,
        project_end_date: this.props.project_end_date,
    }

    onSubmit = e => {
        e.preventDefault();
        if (this.props.onSubmit) this.props.onSubmit(this.state, this.props.project_id)
    }

    onDelete = e => {
        e.preventDefault();
        this.props.onDelete(this.state)
    }

    onUpdate = e => {
        e.preventDefault();
        this.props.onUpdate(this.state, this.props.project_id)
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
                <label className="form-label">Project Name</label>
                <input className="form-input"
                       required
                       name="project_name"
                       type="text"
                       value={this.state.project_name}
                       onChange={this.onChange}
                       />
                <label className="form-label">Project Start Date</label>
                <input className="form-input"
                       required
                       name="project_start_date"
                       type="text"
                       value={this.state.project_start_date}
                       onChange={this.onChange}
                       />
                <label className="form-label">Project End Date</label>
                <input className="form-input"
                       required
                       name="project_end_date"
                       type="text"
                       value={this.state.project_end_date}
                       onChange={this.onChange}
                       />
                
            </div>
        )
        return formUI;
    }

    render() {
        let title = "Project Edit"  //Or render "default"
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

const mapStateToProps = ({ projectReducer }) => ({
    projects: projectReducer.projects
  });

export default ProjectEdit;
