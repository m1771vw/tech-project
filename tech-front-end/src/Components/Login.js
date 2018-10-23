import React, { Component } from 'react';
import { submitLogin } from '../Redux/Actions';
import { connect } from 'react-redux';

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
            <div>
                <input
                    placeholder="Username"
                    value={this.state.userName}
                    onChange={this.onChangeUser} />
                <input
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChangePassword} />
                <button
                    onClick={this.onSubmit}>Login</button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    submitLogin: () => dispatch(submitLogin())
})

export default connect(null, mapDispatchToProps)(Login);
