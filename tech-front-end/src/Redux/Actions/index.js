import axios from 'axios';
import {LOGIN} from '../Constants';
import {ASSIGNMENT} from '../Constants';
import {EMPLOYEE} from '../Constants';
import {PROJECT} from '../Constants';


export const submitLogin = () => async dispatch => {
    try {
        console.log("LOGIN BUTTON PRESSED")
        dispatch({ type: LOGIN , payload: "testuser"})
    } catch {
        console.log("ERROR")
    }
}

export const submitAssignment = () => async dispatch => {
    try {
        console.log("ASSIGNMENT BUTTON PRESSED")
        dispatch({ type: ASSIGNMENT , payload: "testassignment"})
    } catch {
        console.log("ERROR")
    }
}

export const submitEmployee = () => async dispatch => {
    try {
        console.log("EMPLOYEE BUTTON PRESSED")
        dispatch({ type: EMPLOYEE , payload: "testemployee"})
    } catch {
        console.log("ERROR")
    }
}

export const submitProject = () => async dispatch => {
    try {
        console.log("PROJECT BUTTON PRESSED")
        dispatch({ type: PROJECT , payload: "testproject"})
    } catch {
        console.log("ERROR")
    }
}


