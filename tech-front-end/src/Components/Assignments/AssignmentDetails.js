import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AssignmentDetails extends Component {
    componentDidMount() {
        console.log("Assignment Details: ", this.props.location.state);
    }
    render() {
        return (
            <div>
                <h1>Assignment Details Page</h1>
            </div>
        );
    }
}

AssignmentDetails.propTypes = {

};

export default AssignmentDetails;