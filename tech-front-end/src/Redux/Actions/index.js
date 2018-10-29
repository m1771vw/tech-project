import axios from 'axios';
import {
    LOGIN,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    GET_ALL_ASSIGNMENTS,
    GET_ALL_EMPLOYEES,
    GET_ALL_PROJECTS,
    GET_ALL_PROJECT_ROLES,
    GET_ASSIGNMENT_BY_ID,
    GET_ASSIGNMENT_EMPLOYEES,
    GET_PROJECT_BY_ID,
    ADD_ASSIGNMENT,
    ADD_EMPLOYEE,
    ADD_PROJECT,
    REMOVE_ASSIGNMENT,
    REMOVE_EMPLOYEE,
    REMOVE_PROJECT,
    REMOVE_PROJECT_ROLES,
    UPDATE_ASSIGNMENT,
    UPDATE_EMPLOYEE,
    UPDATE_PROJECT,
    UPDATE_PROJECT_ROLES,
    GET_EMPLOYEES_IN_PROJECT,
    GET_ASSIGNMENTS_IN_PROJECT

}
    from '../Constants';

import jwtDecode from 'jwt-decode';
/**
 * Login Actions
 */

export const submitLogin = loginBody => async dispatch => {
    let username = loginBody.username;
    let password = loginBody.password;
    try {
        dispatch({ type: LOGIN_REQUEST })
        console.log("ACTION: SUBMIT LOGIN: ", loginBody);
        let response = await axios.post('http://localhost:5000/api/login', null, {
            auth: {
                username,
                password
            }
        });
        console.log("Response:", response);
        console.log("Decode:", jwtDecode(response.data.token).id)
        dispatch({ type: LOGIN_SUCCESS, token: response.data.token, user: jwtDecode(response.data.token).id})
    } catch (e){
        dispatch({
            type: LOGIN_FAILURE,
            errorMessage: e.response && e.response.data
          })
        if(e.response !== undefined) console.log("ERROR:", e.response.data);
    }
}

/**
 * Assignment Actions
 */

export const getAllAssignments = (token) => async dispatch => {
    try {
        console.log("Action GetAllAssignments Token:", token);
        let response = await axios.get('http://localhost:5000/api/assignments/all', {
            headers: {
                'Authorization': 'bearer ' + token
            }
        });
        dispatch({ type: GET_ALL_ASSIGNMENTS, payload: response.data.assignments })
    } catch (e) {
        console.log("Get All Assignment Error", e.response.data);
    }
}

export const getAssignmentById = id => async dispatch => {
    try  {
        let response = await axios.get(`http://localhost:5000/api/assignments/id/${id}`)
        console.log("Single Assignment Response: ", response);
        dispatch({ type: GET_ASSIGNMENT_BY_ID, payload: response.data.assignment})
    } catch(e) {
        console.log("Get Single Assignment Error", e);
    }
}

export const getAssignmentEmployees = id => async dispatch => {
    try  {
        let response = await axios.get(`http://localhost:5000/api/employees/all/assignments/a_id/${id}`)
        console.log("Employess to an Assignment Response: ", response);
        dispatch({ type: GET_ASSIGNMENT_EMPLOYEES, payload: response.data.assignment_employees})
    } catch(e) {
        console.log("Get Single Assignment Error", e);
    }
}
export const submitAssignment = assignment => async dispatch => {
    try {
        console.log("Trying to submit to assignment:", assignment);
        let response = await axios.post('http://localhost:5000/api/assignments', assignment);
        dispatch({ type: ADD_ASSIGNMENT, payload: response.data.assignment })
    } catch (e) {
        console.log("ERROR:", e)
    }
}

export const deleteAssignment = id => async dispatch => {
    try {
        await axios.delete(`http://localhost:5000/api/assignments/${id}`);
        dispatch({ type: REMOVE_ASSIGNMENT, id })
    } catch (e) {
        console.log("ERROR:", e)
    }
}

export const updateAssignment = (assignment, id) => async dispatch => {
    try {
        let id = 20;
        let response = await axios.put(`http://localhost:5000/api/assignments/${id}`, assignment);
        console.log('RESPONSE: ', response)
        dispatch({ type: UPDATE_ASSIGNMENT, payload: response.data.message, id })
    } catch {
        console.log("ERROR")
    }
}

/**
 * Employee Actions
 */

export const getAllEmployees = () => async dispatch => {
    try {
        let response = await axios.get('http://localhost:5000/api/employees/all');
        console.log("Assignment Response: ", response);
        dispatch({ type: GET_ALL_EMPLOYEES, payload: response.data.employees })
    } catch (e) {
        console.log("Get All Employee Error", e);
    }
}

export const submitEmployee = employee => async dispatch => {
    try {
        console.log("Trying to submit employee:", employee)
        let response = await axios.post('http://localhost:5000/api/employees/', employee);
        console.log("New Response:", response);
        dispatch({ type: ADD_EMPLOYEE, payload: response.data.employee })
    } catch {
        console.log("ERROR")
    }
}

export const deleteEmployee = id => async dispatch => {
    try {
        // hard coded for now since getall does not exist
        // let id = 31;
        await axios.delete(`http://localhost:5000/api/employees/${id}`);
        dispatch({ type: REMOVE_EMPLOYEE, id })
    } catch (e) {
        console.log("ERROR:", e)
    }
}

export const updateEmployee = (employee, id) => async dispatch => {
    try {
        let id = 27;
        let response = await axios.put(`http://localhost:5000/api/employees/${id}`, employee);
        console.log('RESPONSE:', response)
        dispatch({ type: UPDATE_EMPLOYEE, payload: response.data.employee, id })
    } catch (e) {
        console.log("ERROR:", e)
    }
}

/**
 *  Project Actions
 */
export const getAllProjects = () => async dispatch => {
    try {
        let response = await axios.get('http://localhost:5000/api/projects/all');
        console.log("ALL PROJECTS Response: ", response);
        dispatch({ type: GET_ALL_PROJECTS, payload: response.data.projects })
    } catch (e) {
        console.log("Get All Projects Error", e);
    }
}

export const getProjectById = (id) => async dispatch => {
    try {
        let id = 1;
        let response = await axios.get(`http://localhost:5000/api/projects/id/${id}`);
        dispatch({ type: GET_PROJECT_BY_ID, payload: response.data.project})
    } catch (e) {
        console.log('ERROR MESSAGE PROJ.ID: ' , e)
    }
}

export const getEmployeesInProject = () => async dispatch => {
    try{
        let id = 1;
        let response = await axios.get(`http://localhost:5000/api/projects/id/${id}/employees`);
        console.log('THIS IS THE RESPONSE: ', response)
        dispatch({ type: GET_EMPLOYEES_IN_PROJECT, payload: response.data.employees })
    } catch (e) {
        console.log('ERROR MESSAGE GETTING EMPLOYEES IN PROJECT: ' , e)
    }
}

export const getAssignmentsInProject = () => async dispatch => {
    try {
        let id = 1;
        let response = await axios.get(`http://localhost:5000/api/projects/id/${id}/assignments`);
        console.log('assignment response: ', response)
        dispatch({ type: GET_ASSIGNMENTS_IN_PROJECT, payload: response.data.assignments })
    } catch (e) {
        console.log('ERROR MESSAGE GETTING ASSIGNMENTS IN PROJECT: ', e)
    }
}

export const submitProject = project => async dispatch => {
    try {
        let response = await axios.post('http://localhost:5000/api/projects/', project);
        console.log(response);
        dispatch({ type: ADD_PROJECT, payload: response.data.project })
    } catch (e) {
        console.log("ERROR:", e)
    }
}
export const deleteProject = id => async dispatch => {
    try {
        await axios.delete(`http://localhost:5000/api/projects/${id}`)
        dispatch({ type: REMOVE_PROJECT, id })
    } catch (e) {
        console.log("ERROR", e)
    }
}

export const updateProject = (project, id) => async dispatch => {
    try {
        let id = 13;
        let response = await axios.put(`http://localhost:5000/api/projects/${id}`, project)
        dispatch({ type: UPDATE_PROJECT, payload: response.data.message, id })
    } catch (e) {
        console.log("ERROR:", e)
    }
}

export const getAllProjectRoles = () => async dispatch => {
    try {
        let response = await axios.get('http://localhost:5000/api/projects/oles/all')
        console.log("GET PROJECT ROLES:", response)
        dispatch({ type: GET_ALL_PROJECT_ROLES, payload: response.data.role })
    } catch (e) {
        console.log("Get All Project Roles Error: ", e);
    }
}

export const updateProjectRole = (project_role, id) => async dispatch => {
    try {
        let id = 9;
        let response = await axios.put(`http://localhost:500/api/projects/roles/${id}`, project_role)
        dispatch({ type: UPDATE_PROJECT_ROLES, payload: response.data.message, id })
    } catch (e) {
        console.log('ERROR AT', e)
    }
}

export const deleteProjectRole = id => async dispatch => {
    try {
        let id = 10;
        await axios.delete(`http://localhost:5000/api/projects/roles/${id}`)
        dispatch({ type: REMOVE_PROJECT_ROLES, id})
    } catch (e) {
        console.log("ERROR:" , e)
    }
}

