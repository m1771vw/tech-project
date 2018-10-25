import React, { Component } from 'react';
import { getAllProjects } from '../../Redux/Actions/index';
import { connect } from 'react-redux';

class ProjectsPage extends Component {
    state = {
       projects: []
    }
    componentDidMount() {
        console.log("Trying to fetch all projects");
        this.fetchAllProjects();
    }
    
    fetchAllProjects = () => {
        this.props.getAllProjects();
    }

    render() {

        return (
            <div className="">
                Hello?
            </div>

        );
    }
}

const mapStateToProps = ({assignmentReducer}) => ({
    projects: assignmentReducer.projects
})

const  mapDispatchToProps = dispatch => ({
    getAllProjects: () => dispatch(getAllProjects())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPage);