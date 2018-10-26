import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import {Button, Form, Message, Grid } from 'semantic-ui-react';


class Forms extends Component {
    state = {

    }
   
    shouldComponentUpdate(nextProps) {
        if(nextProps.location !== this.props.location) {
            return true;
        }
        return false;
    }

    onSubmit = e => {
        e.preventDefault();
        if (this.props.onSubmit) this.props.onSubmit(this.state)
    }

    onDelete = e => {
        e.preventDefault();
        this.props.onDelete(this.state)
    }

    onUpdate = e => {
        e.preventDefault();
        this.props.onUpdate(this.state)
    }

    onChange = (e, key) => {
        this.setState({
            [key]: this[key].value
        })

    }
    //grab the model
    renderForm = () => {
        let model = this.props.model;
        //loop thorugh all the metadata
        let formUI = model.map((m) => {
            let key = m.key;
            let type = m.type || "text"; //default to "text"
            let props = m.props || {};  // default to empty object

            return (
                
                <Form key={key} className="form-group">
                    {/* form label */}
                    <Form.Input className="form-label"
                        key={"l" + m.key}
                        htmlFor={m.key}>
                        {/* label text  */}
                        {m.label}
                    </Form.Input>
                    <input {...props}
                        //references every input element in array
                        ref={(key) => { this[m.key] = key }}
                        className="form-input"
                        type={type}
                        key={"i" + m.key}
                        //event handler
                        onChange={(e) => { this.onChange(e, key) }}
                    />
                </Form>
                
            );
        });
        return formUI;
    }

    render() {
        let title = this.props.title || "Default Form"  //Or render "default"
        return (
            <div className={this.props.className}>
                <h3>{title}</h3>
                <form className="dynamic-form" onSubmit={(e) => { this.onSubmit(e) }}>
                    {this.renderForm()}
                    <div className="form-group">
                        <Button type="submit">Submit</Button>
                        {/* /temp button */}
                    </div>
                </form>
                <Button onClick={(e) => { this.onDelete(e) }}>x</Button>
                <Button onClick={(e) => { this.onUpdate(e) }}>Update</Button>


            </div>
        )
    }



}

export default Forms;
