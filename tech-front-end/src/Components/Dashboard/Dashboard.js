import React, { Component } from "react";
// import PropTypes from 'prop-types';
import AssignmentsTable from "../Assignments/AssignmentsTable";
import {
  getAllAssignmentsBlocked,
  getAllEmployeeAssignments,
  getAllAssignmentsReversed
} from "../../Redux/Actions";
import { connect } from "react-redux";
import LazyLoad from "react-lazy-load";
import { Table } from "semantic-ui-react";

class Dashboard extends Component {
  state = {
    getAllemployeeAssignments: []
  };
  componentDidMount() {
    this.props.getAllAssignmentsBlocked();
    this.props.getAllAssignmentsReversed();
    this.props.getAllEmployeeAssignments();
  }

  overHours = x => {
    let overTime = [];
    for (let i = 0; i < x.length; i++) {
      if (x[i].assignment_final_hours > x[i].assignment_estimated_hours) {
        overTime.push(x[i]);
      }
    }
    return overTime;
  };
  render() {
    let {
      assignments,
      blockedAssignments,
      getAllEmployeeAssignments
    } = this.props;
    return (
      <div>
        <h1>Welcome to your Dashboard</h1>
        <div>
          <AssignmentsTable
            showUpdate={true}
            assignments={blockedAssignments}
            header={"Assignments Needing Attention"}
          />
        </div>
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
            {this.OverHours(getAllEmployeeAssignments).map(ea => {
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
            })}
          </Table.Body>
        </Table>

        <div>
          <AssignmentsTable
            showUpdate={true}
            assignments={assignments}
            header={"Recent Updated Assignments"}
          />
        </div>

        {/* Scroll to load images.
    <div className="filler" /> */}
        {/* <LazyLoad height={762} offsetVertical={300}>
      <img src='http://apod.nasa.gov/apod/image/1502/HDR_MVMQ20Feb2015ouellet1024.jpg' />
    </LazyLoad>
    <div className="filler" />
    <LazyLoad height={683} offsetTop={200}>
      <img src='http://apod.nasa.gov/apod/image/1502/2015_02_20_conj_bourque1024.jpg' />
    </LazyLoad>
    <div className="filler" />
    <LazyLoad height={480} offsetHorizontal={50}>
      <img src='http://apod.nasa.gov/apod/image/1502/MarsPlume_jaeschke_480.gif' />
    </LazyLoad>
    <div className="filler" />
    <LazyLoad
      height={720}
      onContentVisible={() => console.log('look ma I have been lazyloaded!')}
    >
      <img src='http://apod.nasa.gov/apod/image/1502/ToadSky_Lane_1080_annotated.jpg' />
    </LazyLoad> */}
      </div>
    );
  }
}

// Dashboard.propTypes = {

// };

const mapStateToProps = ({ assignmentReducer, employeeReducer }) => ({
  assignments: assignmentReducer.assignments,
  blockedAssignments: assignmentReducer.blockedAssignments,
  AllEmployeeAssignments: employeeReducer.getAllEmployeeAssignments
});

const mapDispatchToProps = dispatch => ({
  getAllAssignmentsBlocked: () => dispatch(getAllAssignmentsBlocked()),
  getAllAssignmentsReversed: () => dispatch(getAllAssignmentsReversed()),
  getAllEmployeeAssignments: () => dispatch(getAllEmployeeAssignments())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
