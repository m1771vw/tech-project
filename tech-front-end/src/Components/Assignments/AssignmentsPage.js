import React, { Component } from 'react';
import AssignmentsTable from '../Assignments/AssignmentsTable';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { IN_ORDER } from '../../Redux/Constants';
class AssignmentsPage extends Component {
    render() {
        let { assignments } = this.props;
        return (
            <div>
               <Link to='/create/assignment'><Button primary>Create</Button></Link>
               <AssignmentsTable showUpdate={true} assignments={assignments} header={"All Assignments"} sortOrder={IN_ORDER} />
            </div>
        );
    }
}


const mapStateToProps = ({ assignmentReducer}) => ({
    assignments: assignmentReducer.assignments
});


export default connect(mapStateToProps)(AssignmentsPage);