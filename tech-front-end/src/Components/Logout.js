import React, { Component } from 'react';
import { submitLogout } from '../Redux/Actions';
import { connect } from 'react-redux';
import { Form, Segment, Button, Grid, Header } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom';
class Logout extends Component {
    state = {
        submitClicked: false
    }

    onSubmit = () => {
        this.props.submitLogout()
        this.setState({
            submitClicked: true
        })
    }

    render() {
        return (
            <div>
            { this.state.submitClicked ? <Redirect to='/login'/>
            :
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>   
                <Header color='blue'>Log Out</Header>
                <Segment>
        
                <Form size='large'>
                

                    <Button primary
                        onClick={this.onSubmit}>Logout</Button>
                        
                </Form>
                </Segment>
                </Grid.Column>
            </Grid> }
            </div>
           
        );
    }
}

const mapDispatchToProps = dispatch => ({
    submitLogout: () => dispatch(submitLogout())
})

export default connect(null, mapDispatchToProps)(Logout);
