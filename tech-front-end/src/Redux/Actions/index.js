import axios from 'axios';
import {LOGIN, 
    ADD_ASSIGNMENT, 
    ADD_EMPLOYEE,
    ADD_PROJECT,
    REMOVE_EMPLOYEE,
    REMOVE_ASSIGNMENT,
    REMOVE_PROJECT,
    UPDATE_ASSIGNMENT 
} 
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

export const deleteAssignment = (assignment, index) => async dispatch => {
    try {
        
        dispatch({ type: REMOVE_ASSIGNMENT , payload: assignment, index})
    } catch {
        console.log("ERROR")
    }
}

export const updateAssignment = (assignment, index) => async dispatch => {
    try {
        console.log("Update ASSIGNMENT ACTION:", index)
        dispatch({ type:UPDATE_ASSIGNMENT , payload: assignment, index})
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

export const deleteEmployee = (employee, index) => async dispatch => {
    try {
       
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

export const deleteProject = (project, index) => async dispatch => {
    try {
   
        dispatch({ type:REMOVE_PROJECT , payload: project, index})
    } catch {
        console.log("ERROR")
    }
}


