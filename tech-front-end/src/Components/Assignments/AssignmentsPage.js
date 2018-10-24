import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';



export class AssignmentsPage extends Component {
    state = {
        assignId:'',
        assignName:'',
        assignDesc:'',
        assignDue:'',
        assignTo: '',
        assignNotes: '',
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
        let {assignName, assignDesc, assignDue, assignTo, assignNotes} = this.state
        let {handleOnChange} = this
        return (  
            <div className="pageClass">
                <form onSubmit={this.handleSubmit}>
                    <div className="field">
                        <label>Assignment Name</label>
                        <input type="text" onChange={handleOnChange} value={assignName}
                            name="assignName" className="input" />
                    </div>
                    <div className="field">
                        <label>Assignment Description</label>
                        <input type="text" onChange={handleOnChange} value={assignDesc}
                            name="assignDesc" className="input" />
                    </div>
                    <div className="field">
                        <label>Assignment Due Date/Time</label>
                        <input type="text" onChange={handleOnChange} value={assignDue}
                            name="assignDue" className="input" />
                    </div>
                    <div className="field">
                        <label>Assigned To:</label>
                        <input type="text" onChange={handleOnChange} value={assignTo}
                            name="assignTo" className="input" />
                    </div>
                    <div className="field">
                        <label>Assignment Notes</label>
                        <input type="text" onChange={handleOnChange} value={assignNotes}
                            name="assignNotes" className="input" />
                    </div>
                    <button className="button">Submit</button>
                </form>
            </div>

        );
    }
}
 
// const  mapDispatchToProps = dispatch => ({
//     newAssignment: assignment => dispatch(newEmployee(employee))
// })

// //Double check this
// export default connect(null, mapDispatchToProps)(AddEmployee);
export default AssignmentsPage;