import React, { Component } from 'react';
import AssignmentsTable from '../Assignments/AssignmentsTable';
import {
    getAllAssignmentsBlocked,
  getAllEmployeeAssignments,
  getAllAssignmentsReversed,
  getAllAssignments
} from '../../Redux/Actions';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import { Table, Header} from "semantic-ui-react";
import "../../App.css";

class Dashboard extends Component {
    state = {
    getAllemployeeAssignments: []
  }
    componentDidMount() {
        this.props.getAllAssignmentsBlocked()
        this.props.getAllAssignments()
        this.fetchAllEmployeeAssignments();
  }

  fetchAllEmployeeAssignments = () => {
    this.props.getAllEmployeeAssignments(this.props.match.params.id);
  };
  overHours = () => {
    let {AllEmployeeAssignments} = this.props;
    let overTime = [];

    for (let i = 0; i < AllEmployeeAssignments.length; i++) {
      if (AllEmployeeAssignments[i].assignment_final_hours > AllEmployeeAssignments[i].assignment_estimated_hours) {
        overTime.push(AllEmployeeAssignments[i]);
      }
    }
    return overTime;
  };
    render() {
        let { assignments, blockedAssignments, AllEmployeeAssignments} = this.props;
        return (
            <div className='dashboard'>

                <h1>Welcome to your Dashboard</h1>
                <div>
                    <Segment style={{ overflow: 'auto', maxHeight: 400, maxWidth: 1425 }}>
                        <AssignmentsTable showUpdate={true}
                            assignments={blockedAssignments}
                            showProjectName={true}
                            header={"Assignments Needing Attention"} />
                    </Segment>
                </div>
        <Header header = 'h2' color ='blue'>Over Time</Header>
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Assignment Name</Table.HeaderCell>
              <Table.HeaderCell>Employee on Assignment</Table.HeaderCell>
              <Table.HeaderCell>Assignment Elapsed Hours</Table.HeaderCell>
              <Table.HeaderCell>Assignment Estimated Hours</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
                this.overHours(AllEmployeeAssignments).map(ea => {
              return (
                <Table.Row>
                  <Table.Cell key={ea.assignment_id}>
                    {ea.assignment_name}
                  </Table.Cell>
                  <Table.Cell>{ea.emplyoyee_id}</Table.Cell>
                  <Table.Cell>{ea.assignment_final_hours}</Table.Cell>
                  <Table.Cell>{ea.assignment_estimated_hours}</Table.Cell>
                </Table.Row>
              );
            })
            }
          </Table.Body>
        </Table>

                <div>
                    <Segment style={{ overflow: 'auto', maxHeight: 400, maxWidth: 1425 }}>
                        <AssignmentsTable showUpdate={true}
                            assignments={assignments}
                            showProjectName={true}
                            header={"All Assignments"} />
                    </Segment>
                </div>

      </div>
    );
  }
}

const mapStateToProps = ({ assignmentReducer, employeeReducer }) => ({
    assignments: assignmentReducer.assignments,
    blockedAssignments: assignmentReducer.blockedAssignments,
    AllEmployeeAssignments: employeeReducer.getAllEmployeeAssignments
});

const mapDispatchToProps = dispatch => ({
    getAllAssignmentsBlocked: () => dispatch(getAllAssignmentsBlocked()),
    getAllAssignmentsReversed: () => dispatch(getAllAssignmentsReversed()),
    getAllEmployeeAssignments: () => dispatch(getAllEmployeeAssignments()),
    getAllAssignments: () => dispatch(getAllAssignments()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
