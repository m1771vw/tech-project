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
        dispatch({ type: GET_ALL_EMPLOYEES, payload: response.data.employee })
    } catch {
        console.log("Get All Employee Error");
    }
}

export const submitEmployee = employee => async dispatch => {
    try {
        let response = await axios.post('http://localhost:5000/api/employees/', employee);
        dispatch({ type: ADD_EMPLOYEE, payload: response.data.employee })
    } catch {
        console.log("ERROR")
    }
}

export const deleteEmployee = id => async dispatch => {
    try {
        // hard coded for now since getall does not exist
        let id = 31;
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



