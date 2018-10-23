import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';




class Project extends Component {

    state = {
        projectId: '',
        projectName: '',
        projectStart: '',
        projectDue: '',
        employees: [],
        team: '',
        success: false,

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
        // if (this.state.success === true) {
        //     return (<Redirect to='/dashboard' />)
        // }
        let {projectName, projectStart, projectDue, projectId } = this.state
        let {handleOnChange} = this
        return (
            <div className="pageClass">
                <form onSubmit={this.handleSubmit}>
                    <div className="field">
                        <label>Project Name</label>
                        <input type="text" onChange={handleOnChange} value={projectName}
                            name="projectName" className="input" />
                    </div>
                    <div className="field">
                        <label>Project Start</label>
                        <input type="text" onChange={handleonChange} value={projectStart}
                            name="projectStart" className="input" />
                    </div>
                    <div>
                        <label>Project EndDate</label>
                        <input type="text" onChange={handleOnChange} value={projectDue}
                            name="projectDue" className="input" />
                    </div>
                    <div>
                        <label>Add New Project Members</label>
                        <input type="text" onChange={handleOnChange} value={employees}
                            name="employees" className="input" />

                    </div>
                    <div>
                        <label>Team Roster</label>
                        <div>
                            <select value={employees} onChange={handleOnChange.bind(this)}>
                            {
                                    employees.map((employees, employeeId) => {
                                    return ( 
                                    <option key={employeeId} value={employeeId}>{employees}</option>
                                    )
                                })
                            }
                            </select>

                        </div>
                    
                    </div>
                    <div>
                        <button className="button">Submit</button>
                    </div>


                </form>
            </div>


        );
    }
}

// const  mapDispatchToProps = dispatch => ({
//     newProject: project => dispatch(newProject(project))
// })

// //Double check this
// export default connect(null, mapDispatchToProps)(AddProject);
export default Project;