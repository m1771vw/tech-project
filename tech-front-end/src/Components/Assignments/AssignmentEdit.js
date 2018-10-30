import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import {Container, Button, Form, Message, Grid, Header, Segment } from 'semantic-ui-react';

class AssignmentEdit extends Component {
    state = {
        assignment_name: this.props.location.state.assignment_name,
        assignment_start_date: this.props.location.state.assignment_start_date,
        assignment_end_date: this.props.location.state.assignment_end_date,
        project_id: this.props.location.state.project_id,
        status_id: this.props.location.state.status_id,
        assignment_est_hours: this.props.location.state.assignment_est_hours,
        assignment_final_hours: this.props.location.state.assignment_final_hours
    }
//     componentDidMount() {
//         if(this.props.location !== undefined) { 
//         let stateKeys = Object.keys(this.props.location.state);
//         for(let i = 0; i < stateKeys.length; i++) {
//             this.setState({
//                 [stateKeys[i]]: this.props.location.state[stateKeys[i]]
//             })
//         }
//     }
// }
        // console.log("Forms: ", this.props.location.state);
    

    // shouldComponentUpdate(nextProps) {
    //     console.log("checking component did update");
    //     if(nextProps.location !== this.props.location) {
    //         return true;
    //     } return false;
    // }

    onSubmit = e => {
        e.preventDefault();
        if (this.props.onSubmit) this.props.onSubmit(this.state, this.props.location.state.assignment_id)
    }

    onDelete = e => {
        e.preventDefault();
        this.props.onDelete(this.state)
    }

    onUpdate = e => {
        e.preventDefault();
        this.props.onUpdate(this.state)
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
                <label className="form-label">Assignment Name</label>
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
                <label className="form-label">Project ID</label>
                <input className="form-input"
                       required
                       name="project_id"
                       type="text"
                       value={this.state.project_id}
                       onChange={this.onChange}
                       />
                <label className="form-label">Status ID</label>
                <input className="form-input"
                       required
                       name="status_id"
                       type="text"
                       value={this.state.status_id}
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
        // let model = this.props.model;
        // console.log("Model", model);
        // let formUI = model.map((m, index) => {
        //     let key = m.key;
        //     let type = m.type || "text"; //default to "text"
        //     let props = m.props || {};  // default to empty object


        //     return (
        //         <div key={index} className="form-group">
        //         {/* form label */}
        //         <label className="form-label"

        //             htmlFor={m.key}>
        //             {/* label text  */}
        //             {m.label}
        //         </label>
        //         <input {...props}
        //             //references every input element in array
        //             // ref={(key) => { this[m.key] = key }}
        //             className="form-input"
        //             type={type}
        //             name={this.state[key]}
        //             value={this.state[key]}
        //             //event handler
        //             onChange={(e) => { this.onChange(e, key) }}
        //         />
        //     </div>
                // <Form.Group key={key} className="form-group">
                    
                //     {/* form label */}
                //     <Form.Input  className="form-label"
                //         key={"l" + m.key}
                //         htmlFor={m.key}>
                //         {/* label text  */}
                //         {m.label}
                //     </Form.Input>
                //     <Form.Input {...props}
                //         //references every input element in array
                //         ref={(key) => { this[m.key] = key }}
                //         className="form-input"
                //         type={type}
                //         key={"i" + m.key}
                //         //event handler
                //         onChange={(e) => { this.onChange(e, key) }}
                //       >
                //       </Form.Input>
                      
                // </Form.Group>
                // 
            // );
        // });
        return formUI;
    }

    render() {
        let title = "Assignment Edit"  //Or render "default"
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

export default AssignmentEdit;
