import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAssignmentById } from '../../Redux/Actions/';
class AssignmentDetails extends Component {
    async componentDidMount() {
        await this.fetchAssignmentDetails();
        console.log("Assignment Details: ", this.props.match.params.id);
    }

    fetchAssignmentDetails = async () => {
        await this.props.getAssignmentById(this.props.match.params.id);
    }
    render() {
        let {assignment} = this.props
        return (
            <div>
                <h1>Assignment Details Page</h1>
                <h2>Assignment Name: {assignment.assignment_name}</h2>
            </div>
        );
    }
}

AssignmentDetails.propTypes = {

};

const mapStateToProps = ({assignmentReducer}) => ({
    assignment: assignmentReducer.assignment
})

const mapDispatchToProps = dispatch => ({
    getAssignmentById: id => dispatch(getAssignmentById(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(AssignmentDetails);