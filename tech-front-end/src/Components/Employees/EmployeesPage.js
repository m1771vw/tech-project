import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';



class EmployeesPage  extends Component {
    state = {
        employeeId:'',
        employeeName:'',
        employeeTitle:'',
        employeeProjects:'',
        success: false
    }
    
    handleOnChange = e => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();


    }

    toggleSubmit = e => {
        this.setState({ success: true })
    }
    
    
    render() { 
        let {employeeName, employeeTitle, employeeProjects} = this.state
        let {handleOnChange} = this
        return (  
            <div className="pageClass">
                <form onSubmit={this.handleSubmit}>
                    <div className="field">
                        <label>Employee Name</label>
                        <input type="text" onChange={handleOnChange} value={employeeName}
                            name="employeeName" className="input" />
                    </div>
                    <div className="field">
                        <label>Employee Title</label>
                        <input type="text" onChange={handleOnChange} value={employeeTitle}
                            name="employeeTitle" className="input" />
                    </div>
                    <div className="field">
                        <label>Employee Project Participation</label>
                        <input type="text" onChange={handleOnChange} value={employeeProjects}
                            name="employeeProjects" className="input" />
                    </div>
                    <button className="button">Submit</button>
                </form>
            </div>

        );
    }
}
 

// const  mapDispatchToProps = dispatch => ({
//     newEmployee: employee => dispatch(newEmployee(employee))
// })

// //Double check this
// export default connect(null, mapDispatchToProps)(AddEmployee);
export default EmployeesPage;