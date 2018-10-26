import React, { Component } from 'react';

class ProjectDetails extends Component {
    state = {
        projects: [],
    }

    componentDidMount() {
        
    }


    render() {
        return (
            <div>
                {this.props.projects.map((projects, index) => {
                    return (
                        <div
                            key={index}>
                            <h1>projects.project.name</h1>
                            <h1>projects.project</h1>
                        </div>
                    )
                })}
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => ({

})
export default ProjectDetails;