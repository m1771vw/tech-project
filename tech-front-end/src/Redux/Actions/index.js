import axios from 'axios';
import {
    LOGIN,
    GET_ALL_ASSIGNMENT,
    GET_ALL_EMPLOYEES,
    GET_ALL_PROJECT,
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

export const submitAssignment = (assignment) => async dispatch => {
    try {
        dispatch({ type: ADD_ASSIGNMENT, payload: assignment })
    } catch {
        console.log("ERROR")
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
        dispatch({ type: GET_ALL_EMPLOYEES, payload: response.data.employee})
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

export const submitProject = (project) => async dispatch => {
    try {
        let response = await axios.post('http://localhost:5000/api/projects/', project);
        dispatch({ type: ADD_PROJECT, payload: response.data })
    } catch {
        console.log("ERROR")
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



