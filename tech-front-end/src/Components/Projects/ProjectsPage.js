import React, { Component } from 'react';
import { getAllProjects, getAllProjectRoles, deleteProject } from '../../Redux/Actions/index';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazy-load';
import { Button, Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class ProjectsPage extends Component {
    state = {
        projects: [],
        project_roles:[],
    }
    componentDidMount() {
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
        let {projects} = this.props

        return (
            <div>
                <Link to='/createAssignments'><Button>Create</Button></Link>

           
            <LazyLoad height={100} offsetVertical={300}>
            <Table singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Project ID</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Start Date</Table.HeaderCell>
                            <Table.HeaderCell>End Date</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>

                {  projects &&
                     projects.map((p) => {
                let project_id = p.project_id || "i"
                let project_name = p.project_name;
                let project_start_date = p.project_start_date;
                let project_end_date = p.project_end_date;
            return( 
                <Table.Row key = {project_id}>
                    <Table.Cell> {project_id}</Table.Cell>
                    <Table.Cell>{project_name}</Table.Cell>
                    <Table.Cell>{project_start_date}</Table.Cell>
                    <Table.Cell>{project_end_date}</Table.Cell>
                    <Link to='/update-project'><Button>Update</Button></Link>
                    <Button onClick={() => this.props.deleteProject(project_id)}>Delete</Button>
                                   
                </Table.Row>
            );

       })}

            </Table.Body>
            </Table>
            </LazyLoad>
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
    getAllProjectRoles: () => dispatch(getAllProjectRoles()),
    deleteProject: id => dispatch(deleteProject(id))

})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPage);