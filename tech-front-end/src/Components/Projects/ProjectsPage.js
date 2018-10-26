import React, { Component } from 'react';
import { getAllProjects, getAllProjectRoles } from '../../Redux/Actions/index';
import { connect } from 'react-redux';

class ProjectsPage extends Component {
    state = {
        projects: [],
        project_roles:[],
    }
    componentDidMount() {
        console.log("Trying to fetch all projects");
        this.fetchAllProjects();
        this.fetchAllProjectRoles();
        
    }
    
    fetchAllProjects = () => {
        this.props.getAllProjects();
        
    }
    
    fetchAllProjectRoles = () => {
        this.props.getAllProjectRoles();
    }

    render() {

        return (
            <div className="">
                Hello?
            </div>

        );
    }
}

const mapStateToProps = ({ projectReducer }) => ({
    projects: projectReducer.projects,
    project_role: projectReducer.project_role
})

const mapDispatchToProps = dispatch => ({
    getAllProjects: () => dispatch(getAllProjects()),
    getAllProjectRoles: () => dispatch(getAllProjectRoles())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPage);