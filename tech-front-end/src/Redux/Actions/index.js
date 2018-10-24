import axios from 'axios';
import {LOGIN, ASSIGNMENT, EMPLOYEE, PROJECT} from '../Constants';


export const submitLogin = () => async dispatch => {
    try {
        dispatch({ type: LOGIN , payload: "testuser"})
    } catch {
        console.log("ERROR")
    }
}

export const submitAssignment = (assignment) => async dispatch => {
    try {
        dispatch({ type: ASSIGNMENT , payload: assignment})
    } catch {
        console.log("ERROR")
    }
}
// asdf is a temporary parameter. 
export const submitEmployee = (employee) => async dispatch => {
    try {
        dispatch({ type: EMPLOYEE , payload: employee})
    } catch {
        console.log("ERROR")
    }
}

export const submitProject = (project) => async dispatch => {
    try {
        dispatch({ type: PROJECT , payload: project})
    } catch {
        console.log("ERROR")
    }
}


