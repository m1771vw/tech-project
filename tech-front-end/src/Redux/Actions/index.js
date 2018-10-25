import axios from 'axios';
import {
    LOGIN,
    ADD_ASSIGNMENT,
    ADD_EMPLOYEE,
    ADD_PROJECT,
    REMOVE_EMPLOYEE,
    REMOVE_ASSIGNMENT,
    REMOVE_PROJECT,
    UPDATE_ASSIGNMENT,
    UPDATE_EMPLOYEE,
    UPDATE_PROJECT
}
    from '../Constants';


export const submitLogin = () => async dispatch => {
    try {
        dispatch({ type: LOGIN, payload: "testuser" })
    } catch {
        console.log("ERROR")
    }
}

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
        console.log("Update ASSIGNMENT ACTION:", assignment)
        dispatch({ type: UPDATE_ASSIGNMENT, payload: assignment, index })
    } catch {
        console.log("ERROR")
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

export const submitProject = (project) => async dispatch => {
    try {
        let response = await axios.post('http://localhost:5000/api/projects/', project);
        dispatch({ type: ADD_PROJECT, payload: response.data })
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


export const deleteProject = (project, index) => async dispatch => {
    try {

        dispatch({ type: REMOVE_PROJECT, payload: project, index })
    } catch {
        console.log("ERROR")
    }
}

export const updateProject = (project, index) => async dispatch => {
    try {
        console.log("Update PROJECT ACTION:", project)
        dispatch({ type: UPDATE_PROJECT, payload: project, index })
    } catch {
        console.log("ERROR")
    }
}



