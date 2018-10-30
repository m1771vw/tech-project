import React, { Component } from 'react';
import AssignmentsTable from '../Assignments/AssignmentsTable';

class AssignmentsPage extends Component {
    render() {
        return (
            <div>
               <AssignmentsTable header={"All Assignments"} />
            </div>
        );
    }
}





export default AssignmentsPage;