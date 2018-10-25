import axios from 'axios';
import {
    LOGIN,
    GET_ALL_ASSIGNMENTS,
    GET_ALL_EMPLOYEES,
    GET_ALL_PROJECTS,
    ADD_ASSIGNMENT,
    ADD_EMPLOYEE,
    ADD_PROJECT,
    REMOVE_ASSIGNMENT,
    REMOVE_EMPLOYEE,
    REMOVE_PROJECT,
    UPDATE_ASSIGNMENT,
    UPDATE_EMPLOYEE,
    UPDATE_PROJECT
}
from '../Constants';

/**
 * Login Actions
 */

export const submitLogin = () => async dispatch => {
    try {
        dispatch({ type: LOGIN, payload: "testuser" })
    } catch {
        console.log("ERROR")
    }
}

/**
 * Assignment Actions
 */

 export const getAllAssignments = () => async dispatch => {
    try {
        let response = await axios.get('http://localhost:5000/api/assignments/all');
        console.log("Response: ", response);
        dispatch({ type: GET_ALL_ASSIGNMENTS, payload: response.data.assignments})
    } catch(e) {
        console.log("Get All Assignment Error", e);
    }
 }

export const submitAssignment = assignment => async dispatch => {
    try {
        let response = await axios.post('http://localhost:5000/api/assignments', assignment);
        dispatch({ type: ADD_ASSIGNMENT, payload: response.data.assignment })
    } catch (e) {
        console.log("ERROR:", e)
    }
}

export const deleteAssignment = (assignment, index) => async dispatch => {
    try {
        dispatch({ type: REMOVE_ASSIGNMENT, payload: assignment, index })
    } catch {
        console.log("ERROR")
    }
}

export const updateAssignment = (assignment, index) => async dispatch => {
    try {
        dispatch({ type: UPDATE_ASSIGNMENT, payload: assignment, index })
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
        console.log("Response: ", response);
        dispatch({ type: GET_ALL_EMPLOYEES, payload: response.data.employees})
    } catch(e) {
        console.log("Get All Employee Error", e);
    }
}

export const submitEmployee = employee => async dispatch => {
    try {
        let response = await axios.post('http://localhost:5000/api/employees/', employee);
        dispatch({ type: ADD_EMPLOYEE, payload: response.data.employees })
    } catch {
        console.log("ERROR")
    }
}

export const deleteEmployee = (employee, index) => async dispatch => {
    try {
        dispatch({ type: REMOVE_EMPLOYEE, payload: employee, index })
    } catch {
        console.log("ERROR")
    }
}

export const updateEmployee = (employee, index) => async dispatch => {
    try {
        dispatch({ type: UPDATE_EMPLOYEE, payload: employee, index })
    } catch {
        console.log("ERROR")
    }
}

/**
 *  Project Actions
 */
export const getAllProjects = () => async dispatch => {
    try {
         let response = await axios.get('http://localhost:5000/api/projects/all');
         console.log("Response: ", response);
         dispatch({ type: GET_ALL_PROJECTS, payload: response.data.projects})
     } catch(e) {
         console.log("Get All Projects Error", e);
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
export const deleteProject = (project, index) => async dispatch => {
    try {
        dispatch({ type: REMOVE_PROJECT, payload: project, index })
    } catch {
        console.log("ERROR")
    }
}

export const updateProject = (project, index) => async dispatch => {
    try {
        dispatch({ type: UPDATE_PROJECT, payload: project, index })
    } catch {
        console.log("ERROR")
    }
}



