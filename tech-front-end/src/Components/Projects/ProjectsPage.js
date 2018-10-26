import React, { Component } from 'react';
import { getAllProjects } from '../../Redux/Actions/index';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazy-load';

class ProjectsPage extends Component {
    state = {
       projects: []
    }
    componentDidMount() {
        this.fetchAllProjects();
    }
    
    fetchAllProjects = () => {
        this.props.getAllProjects();
    }

    render() {
        let {projects} = this.props

        return (
            <LazyLoad height={100} offsetVertical={300}>
            <div>
                <h1>Get Projects </h1>
                {  projects &&
                     projects.map((p) => {
                let project_id = p.project_id || "i"
                let project_name = p.project_name;
                let project_start_date = p.project_start_date;
                let project_end_date = p.project_end_date;
            return( 
                <div key = {project_id} className ="form-group">
                    <label> {project_id + " "}</label>
                    <label>{project_name + " "}</label>
                    <label>{project_start_date + " "}</label>
                    <label>{project_end_date + " "}</label>
                </div>
            );

       })}


            </div>
            </LazyLoad>
        );
    }
}

const mapStateToProps = ({projectReducer}) => ({
    projects: projectReducer.projects
})

const  mapDispatchToProps = dispatch => ({
    getAllProjects: () => dispatch(getAllProjects())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPage);