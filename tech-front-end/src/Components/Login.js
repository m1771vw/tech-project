import React, { Component } from 'react';
import { submitLogin } from '../Redux/Actions';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Form, Segment, Button, Grid, Header } from 'semantic-ui-react'

class Login extends Component {
    state = {
        username: '',
        password: '',
        submitClicked: false
    }

    onChangeUser = e => {
        this.setState({
            username: e.target.value
        })
    }

    onChangePassword = e => {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit = async () => {
        let { username, password } = this.state
        let user = {
            username, password
        }
        await this.props.submitLogin(user);
        this.setState({
            submitClicked: true
        })
    }

    render() {
        return (
            <div>
            { this.state.submitClicked ? <Redirect to='/'/>
            :
                <div>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>   
                <Header color='teal'>Log In</Header>
                <Segment>
                <Form size='large'>
                    <Form.Input
                        icon='user' 
                        iconPosition='left'
                        placeholder="User Name"
                        value={this.state.username}
                        onChange={this.onChangeUser}>
                    </Form.Input>
                    <Form.Input
                        icon='lock'
                        iconPosition='left'
                        placeholder="Password"
                        type='password'
                        value={this.state.password}
                        onChange={this.onChangePassword}>
                    </Form.Input>
                    <Button primary
                        onClick={this.onSubmit}>Login</Button>    
                </Form>
                </Segment>
                {this.props.location.state && this.props.location.state.failed ? 
                 <Header color='red'>You are not authorized. Please log in!</Header>
                :<div></div> }
                </Grid.Column>
                
                </Grid>
                    
                </div>
            }   
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    submitLogin: loginBody => dispatch(submitLogin(loginBody))
})

export default connect(null, mapDispatchToProps)(Login);
