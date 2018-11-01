import React, { Component } from 'react';
import { submitProject, getAllProjects, getAllProjectRoles, deleteProject, updateProject } from '../../Redux/Actions/index';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazy-load';
import { Button, Table, Header, Modal, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { formatDate } from '../../util/DateHelper'
import ProjectCreate from './ProjectCreate'
import ProjectEdit from './ProjectEdit'
import ProjectRow from './ProjectRow'
import "../../App.css";

class ProjectsPage extends Component {
    state = {
        projectModal: false,

    }

    async componentDidMount() {
        await this.fetchAllProjects();
        await this.fetchAllProjectRoles();
    }

    createAssignmentButton = (e) => {
        e.preventDefault()
        this.closeProjectModal();
    }

    closeProjectModal = () => {
        this.setState({
            projectModal: false
        })
    }

    fetchAllProjects = async () => {
        await this.props.getAllProjects();
    }

    fetchAllProjectRoles = () => {
        this.props.getAllProjectRoles();
    }

    onSubmitProjectModal = async (model) => {
        model = { ...model, project_id: this.props.match.params.id }
        await this.props.submitProject(model);
        await this.fetchAllProjects();
        await this.closeProjectModal();
        this.setState({
            projectModal: false,
        });

    }

    onUpdateProjectModal = async (model) => {
        model = { ...model, project_id: this.props.match.params.id }
        await this.props.updateProject(model);
        await this.fetchAllProjects();
        // await this.closeProjectModal();
        // this.setState({
        //     assignmentModal: false,
        // });

    }


    render() {
        let { projects } = this.props

        return (
            <div>

                <Modal
                    onClose={this.closeProjectModal}
                    open={this.state.projectModal}
                    trigger={<Button color='teal' onClick={() => { this.setState({ projectModal: true }) }}>Add Project</Button>} closeIcon>
                    <Modal.Header>Add Project</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>

                            <ProjectCreate
                                onSubmit={this.onSubmitProjectModal}
                            // key={this.props.key}
                            />

                        </Modal.Description>
                    </Modal.Content>
                </Modal>


                
                {/* <LazyLoad height={100} offsetVertical={300}> */}
                    <div className='need-pad'>
                        <Header color='teal'>Projects</Header>
                        <Segment style={{overflow: 'auto', maxHeight: 500, maxWidth:1425 }}>

                        <Table striped padded color='teal' singleLine selectable>

                            <Table.Header>
                                <Table.Row>

                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Start Date</Table.HeaderCell>
                                    <Table.HeaderCell>End Date</Table.HeaderCell>
                                    <Table.HeaderCell></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>

                                {projects &&
                                    projects.map((p) => {
                                        let project_id = p.project_id || "i"
                                        let project_name = p.project_name;
                                        let project_start_date = p.project_start_date;
                                        let project_end_date = p.project_end_date;
                                        return (
                                            <ProjectRow
                                                key={project_id + project_name}
                                                project={p}
                                                onSubmit={this.onUpdateProjectModal}
                                            />
                                        );

                                    })}

                            </Table.Body>
                        </Table>
                        </Segment>
                    </div>
                {/* </LazyLoad> */}

            </div>
        );
    }
}

const mapStateToProps = ({ projectReducer }) => ({
    projects: projectReducer.projects,
    project_roles: projectReducer.project_roles
})

const mapDispatchToProps = dispatch => ({
    getAllProjects: () => dispatch(getAllProjects()),
    getAllProjectRoles: () => dispatch(getAllProjectRoles()),
    deleteProject: id => dispatch(deleteProject(id)),
    submitProject: (model) => dispatch(submitProject(model)),
    updateProject: (model) => dispatch(updateProject(model))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPage);