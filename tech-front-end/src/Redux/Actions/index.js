import axios from 'axios';
import {LOGIN, 
    ADD_ASSIGNMENT, 
    ADD_EMPLOYEE, 
    ADD_PROJECT} 
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

export const submitProject = (project) => async dispatch => {
    try {
        dispatch({ type: ADD_PROJECT , payload: project})
    } catch {
        console.log("ERROR")
    }
}


