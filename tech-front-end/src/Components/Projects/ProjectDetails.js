import React, { Component } from 'react';
import projectReducer from '../../Redux/Reducers/Project';
import { getAllProjects, getAllProjectRoles, getProjectById } from '../../Redux/Actions/index';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazy-load';
import { Table } from 'semantic-ui-react';

class ProjectDetails extends Component {
    state = {
        
    }

    async componentDidMount() {
        await this.fetchProjectById();
        console.log('SUCCESSFUL PROPS: ' , this.props.project_by_id);
    }


    fetchProjectById = async () => {
        await this.props.getProjectById();
    }


    // fetchAllData = () => {
    //     this.props.getAllProjects();
    //     this.props.getAllProjectRoles();
    //     this.props.getAllEmployees();
    //     this.props.getAllAssignments();
    // }






    render() {
        return (
            <div>
                <h1>Project Overview </h1>
                <Table singleLine>
                <Table.Header>
                    <h1>{this.props.project_by_id.project_name}</h1>
                    <h5>Start Date: {this.props.project_by_id.project_start_date}</h5>
                    <h5>End Date: {this.props.project_by_id.project_end_date}</h5>
                    <Table.Row>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                </Table>
                <Table singleLine>
                <Table.Header>
                    <h1>Project Employees</h1>
                    <Table.Row>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                </Table>






            </div>
        );
    }
}


const mapStateToProps = ({projectReducer}) => ({
    projects: projectReducer.projects,
    project_roles: projectReducer.project_roles,
    project_by_id: projectReducer.project_by_id
    
})

const mapDispatchToProps = dispatch => ({
    getAllProjects: () => dispatch(getAllProjects()),
    getAllProjectRoles: () => dispatch(getAllProjectRoles()),
    getProjectById: () => dispatch(getProjectById()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);