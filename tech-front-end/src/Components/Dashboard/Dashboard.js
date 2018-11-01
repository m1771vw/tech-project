import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import AssignmentsTable from '../Assignments/AssignmentsTable';
import { RECENT_ORDER, NEED_ATTENTION } from '../../Redux/Constants';
import {getAllAssignmentsBlocked,
    getAllAssignmentsReversed} from '../../Redux/Actions';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazy-load';


class Dashboard extends Component {
    componentDidMount() {
        this.props.getAllAssignmentsBlocked()
        this.props.getAllAssignmentsReversed()
    }
    render() {
        let { assignments, blockedAssignments } = this.props;
        return (
            <div>

                <h1>Welcome to your Dashboard</h1>
                <div>
                <AssignmentsTable showUpdate={true} assignments={blockedAssignments} header={"Assignments Needing Attention"} />
                </div>
                <div>
                <AssignmentsTable showUpdate={true} assignments={assignments} header={"Recent Updated Assignments"} />
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

const mapStateToProps = ({assignmentReducer}) => ({
    assignments: assignmentReducer.assignments,
    blockedAssignments: assignmentReducer.blockedAssignments,

});

const mapDispatchToProps = dispatch => ({
    getAllAssignmentsBlocked: () => dispatch(getAllAssignmentsBlocked()),
    getAllAssignmentsReversed: () => dispatch(getAllAssignmentsReversed()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);