import React, { Component } from 'react';

class Login extends Component {
    state = {
        userName: '',
        password:''
    }

    onChangeUser = e =>{
        this.setState({
            userName: e.target.value
        })
    }

    onChangePassword = e => {
        this.setState({
            password: e.target.value
        })
    }

    


    render() {
        return (
            <div>   
                <input
                placeholder="Username"
                value={this.state.userName}
                onChange={this.onChangeUser}/>

                <input 
                placeholder="Password"
                value={this.state.password}
                onChange={this.onChangePassword}/>

                <button
                onClick={this.submitLogin}>Login</button>


            </div>
        );
    }
}

export default Login;