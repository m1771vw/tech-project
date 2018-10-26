import React, { Component } from 'react';
import { submitLogin } from '../Redux/Actions';
import { connect } from 'react-redux';
import { Table, Form, Segment, Button, Icon, Grid, Header, Message } from 'semantic-ui-react'

class Login extends Component {
    state = {
        userName: '',
        password: ''
    }

    onChangeUser = e => {
        this.setState({
            userName: e.target.value
        })
    }

    onChangePassword = e => {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit = () => {
        this.props.submitLogin()
    }

    render() {
        return (
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>   
            <Header color='blue'>Log In</Header>
            <Segment>
    
            <Form size='large'>
            
                <Form.Input
                    icon='user' 
                    iconPosition='left'
                    placeholder="Username"
                    value={this.state.userName}
                    onChange={this.onChangeUser}>
                </Form.Input>
                <Form.Input
                    icon='lock'
                    iconPosition='left'
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChangePassword}>
                </Form.Input>
                <Button primary
                    onClick={this.onSubmit}>Login</Button>
                    
            </Form>
            <Message>
            New to the Team? <a href='#'>Sign Up</a>
                 </Message>
            </Segment>
            </Grid.Column>
            </Grid>
           
        );
    }
}

const mapDispatchToProps = dispatch => ({
    submitLogin: () => dispatch(submitLogin())
})

export default connect(null, mapDispatchToProps)(Login);
