import React, { Component } from 'react';
import projectReducer from '../../Redux/Reducers/Project';
import { getAllProjects, getAllProjectRoles } from '../../Redux/Actions/index';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazy-load';
import { Table } from 'semantic-ui-react';

class ProjectDetails extends Component {
    state = {
        currentProjectId: 1,
        projectDetails: [],
    }

    componentDidMount() {
        this.fetchAllData();
        console.log(this.state);
    }

    fetchAllData = () => {
        this.props.getAllProjects();
        this.props.getAllProjectRoles();
        this.props.getAllEmployees();
        this.props.getAllAssignments();
    }






    render() {
        return (
            <div>
                <Table singleLine>
                <Table.Header>
                    Project Overview 
                    <Table.Row>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                </Table>
            </div>
        );
    }
}


const mapStateToProps = dispatch => ({
    projects: projectReducer.projects,
    project_roles: projectReducer.project_roles
})

const mapDispatchToProps = dispatch => ({
    getAllProjects: () => dispatch(getAllProjects()),
    getAllProjectRoles: () => dispatch(getAllProjectRoles())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);