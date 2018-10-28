import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AssignmentDetails extends Component {
    componentDidMount() {
        console.log("Assignment Details: ", this.props);
    }
    render() {
        return (
            <div>
                <h1>Assignment Details Page</h1>
                <h2>Assignment Name: </h2>
            </div>
        );
    }
}

AssignmentDetails.propTypes = {

};

export default AssignmentDetails;