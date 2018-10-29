import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Container, Button, Form, Message, Grid, Header, Segment } from 'semantic-ui-react';

class Forms extends Component {
    state = {

    }
    componentDidMount() {
        // if(this.props.location !== undefined) { 
        // console.log("Keys:", Object.keys(this.props.location.state));
        // let stateKeys = Object.keys(this.props.location.state);
        // for(let i = 0; i < stateKeys.length; i++) {
        //     this.setState({
        //         [stateKeys[i]]: this.props.location.state[stateKeys[i]]
        //     })
        // }
    }
       
        // console.log("Forms: ", this.props.location.state);
    

    shouldComponentUpdate(nextProps) {
        if (nextProps.location !== this.props.location) {
            return true;
        } return false;
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
        let formUI = model.map((m, index) => {
            let key = m.key;
            let type = m.type || "text"; //default to "text"
            let props = m.props || {};  // default to empty object


            return (
                <div key={key} className="form-group">
                    {/* form label */}
                    <label className="form-label"
                        key={"l" + m.key}
                        htmlFor={m.key}>
                        {/* label text  */}
                        {m.label}
                    </label>
                    <input {...props}
                        //references every input element in array
                        ref={(key) => { this[m.key] = key }}
                        className="form-input"
                        type={type}
                        key={"i" + m.key}
                        // value={this.state[stateKeys[index]]}
                        //event handler
                        onChange={(e) => { this.onChange(e, key) }}
                    />
                </div>
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

            );
        });
        return formUI;
    }

    render() {
        let title = this.props.title || "Default Form"  //Or render "default"
        return (
            <Grid className={this.props.className}>
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

export default Forms;
