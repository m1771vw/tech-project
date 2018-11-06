import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getAssignmentById, getAssignmentEmployees } from '../../Redux/Actions/';
import { Table, Header } from 'semantic-ui-react';
import AssignmentsTable from '../Assignments/AssignmentsTable';
import { Segment } from 'semantic-ui-react';

class AssignmentDetails extends Component {

  async componentDidMount() {
    await this.fetchAssignmentDetails();
  }

  async shouldComponentUpdate(prevProps) {
    if (prevProps.currentUser !== this.props.currentUser) {
      await this.fetchAssignmentDetails();
    }
  }

  fetchAssignmentDetails = async () => {
      await this.props.getAssignmentById(this.props.match.params.id);
      await this.props.getAssignmentEmployees(this.props.match.params.id);
  }

  render() {
      let {assignment, assignmentEmployees} = this.props
      return (
          <div>
              <Segment style={{ overflow: 'auto', maxHeight: 400, maxWidth: 1425 }}>
              <h1>Assignment Details Page</h1>
              <AssignmentsTable showDates={true}
                                showUpdate={true}
                                showProjectName={true}
                                assignments={[assignment]}
                                header={"Recent Updated Assignments"} />
              <Header color="blue">Employees on Assignment</Header>
                <Table padded color='blue' singleLine>
                  <Table.Header>
                        {assignmentEmployees.map(a => {
                          return(
                            <Table.Row>
                              <Table.Cell>Employee Name: {a.first_name} {a.last_name}</Table.Cell>
                            </Table.Row>
                          )
                        })}
                  </Table.Header>
                </Table>
              </Segment>
          </div>
      )
    }
}

const mapStateToProps = ({ assignmentReducer, loginReducer }) => ({
  assignment: assignmentReducer.assignment,
  assignmentEmployees: assignmentReducer.assignmentEmployees,
  currentUser: loginReducer.currentUser
})

const mapDispatchToProps = dispatch => ({
  getAssignmentById: id => dispatch(getAssignmentById(id)),
  getAssignmentEmployees: id => dispatch(getAssignmentEmployees(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignmentDetails);
