import axios from 'axios';
import {LOGIN} from '../Constants';

export const submitLogin = () => async dispatch => {
    try {
        console.log("LOGIN BUTTON PRESSED")
        dispatch({ type: LOGIN , payload: "testuser"})
    } catch {
        console.log("ERROR")
    }
}

