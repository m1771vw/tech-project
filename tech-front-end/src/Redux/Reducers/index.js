import { combineReducers } from 'redux';
import projectReducer from '../Reducers/Project';
import assignmentReducer from '../Reducers/Assignment';
import employeeReducer from '../Reducers/Employee';

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

/**
 * projectReducer: projectReducer
 * employeeReducer:employeeReducer
 * assignmentReducer: assignmentReducer
 * */
export default combineReducers({projectReducer: projectReducer, employeeReducer, assignmentReducer}) // combines all the states to state.projectReducer
