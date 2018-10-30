import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import {Container, Button, Form, Message, Grid, Header, Segment } from 'semantic-ui-react';

class EmployeeEdit extends Component {
    state = {
        first_name: this.props.location.state.first_name,
        last_name: this.props.location.state.last_name,
        position: this.props.location.state.position
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
