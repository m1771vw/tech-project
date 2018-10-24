import { LOGIN } from '../Constants';
import { ADD_EMPLOYEE, ADD_PROJECT, ADD_ASSIGNMENT, REMOVE_EMPLOYEE } from '../Constants';

import { combineReducers } from 'redux';
import project from '../Reducers/Project';
import assignment from '../Reducers/Assignment';
import employee from '../Reducers/Employee';

// const initialState = {
//     currentUser: '',
//     employeeData: [],
//     assignmentData: [],
//     projectData: []
// }



// Create action.types for DELETE_EMPLOYEE...etc.
// const rootReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case LOGIN:
//             return {...state, currentUser: action.payload};
//         case ADD_EMPLOYEE:
//             return {...state, 
//                 employeeData: [...state.employeeData, action.payload]
//             };

//         case REMOVE_EMPLOYEE:
//         // Need some action.index
//             return {
//                 ...state,
//                 employeeData: [...state.employeeData.slice(0, action.index),
//                                 ...state.employeeData.slice(action.index + 1)]
//             };

//         // case UPDATE_EMPLOYEE:
//         // return {
//         //     ...state,
//         //     employeeData: [...state.employeeData.slice(0, action.index),
//         //                     employeeData,
//         //                     ...state.employeeData.slice(action.index + 1)]
//         // };

//         case ADD_ASSIGNMENT:
//             return {...state, 
//                 assignmentData: [...state.assignmentData, action.payload]
//             };
//         case ADD_PROJECT:
//             return {...state, 
//                 projectData: [...state.projectData, action.payload]
//             }
//             return {
//                 ...state,
//                 currentUser: action.payload
//             };
//         case EMPLOYEE:
//             return {
//                 ...state,
//                 employeeData: [
//                     ...state.employeeData,
//                     action.payload
//                 ]
//             };
//         case ASSIGNMENT:
//             return {
//                 ...state,
//                 assignmentData: [
//                     ...state.assignmentData,
//                     action.payload
//                 ]
//             };
//         case PROJECT:
//             return {
//                 ...state,
//                 projectData: [
//                     ...state.projectData,
//                     action.payload
//                 ]
//             };
//         default:
//             return state;
//     }
// }

export default combineReducers({project, employee, assignment})
