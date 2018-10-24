import axios from 'axios';
import {LOGIN, 
    ADD_ASSIGNMENT, 
    ADD_EMPLOYEE,
    ADD_PROJECT,
    REMOVE_EMPLOYEE } 
from '../Constants';


export const submitLogin = () => async dispatch => {
    try {
        dispatch({ type: LOGIN , payload: "testuser"})
    } catch {
        console.log("ERROR")
    }
}

export const submitAssignment = (assignment) => async dispatch => {
    try {
        dispatch({ type: ADD_ASSIGNMENT , payload: assignment})
    } catch {
        console.log("ERROR")
    }
}

export const submitEmployee = (employee) => async dispatch => {
    try {
        dispatch({ type:ADD_EMPLOYEE , payload: employee})
    } catch {
        console.log("ERROR")
    }
}

// Needs to dispatch index
// The index needs to be a parameter
// Need to update parameters in app.js
export const deleteEmployee = (employee, index) => async dispatch => {
    try {
        console.log("REMOVE EMPLOYEE ACTION:", index)
        dispatch({ type:REMOVE_EMPLOYEE , payload: employee, index})
    } catch {
        console.log("ERROR")
    }
}



export const submitProject = (project) => async dispatch => {
    try {
        dispatch({ type: ADD_PROJECT , payload: project})
    } catch {
        console.log("ERROR")
    }
}


