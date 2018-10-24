import { LOGIN } from '../Constants';
import { ADD_EMPLOYEE, 
        ADD_PROJECT, 
        ADD_ASSIGNMENT, 
        REMOVE_EMPLOYEE, 
        REMOVE_ASSIGNMENT, 
        REMOVE_PROJECT, 
        UPDATE_ASSIGNMENT 
    } from '../Constants';


const initialState = {
    currentUser: '',
    employeeData: [],
    assignmentData: [],
    projectData: [],

}



// Create action.types for DELETE_EMPLOYEE...etc.
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, currentUser: action.payload };
        case ADD_EMPLOYEE:
            return {
                ...state,
                employeeData: [...state.employeeData, action.payload]
            };

        case REMOVE_EMPLOYEE:
            // Need some action.index
            return {
                ...state,
                employeeData: [...state.employeeData.slice(0, action.index),
                ...state.employeeData.slice(action.index + 1)]
            };

        // case UPDATE_EMPLOYEE:
        // return {
        //     ...state,
        //     employeeData: [...state.employeeData.slice(0, action.index),
        //                     employeeData,
        //                     ...state.employeeData.slice(action.index + 1)]
        // };

        case ADD_ASSIGNMENT:
            return {
                ...state,
                assignmentData: [...state.assignmentData, action.payload]
            };

        case REMOVE_ASSIGNMENT:
            // Need some action.index
            return {
                ...state,
                assignmentData: [...state.assignmentData.slice(0, action.index),
                ...state.assignmentData.slice(action.index + 1)]
            };

            case UPDATE_ASSIGNMENT:
        return {
            ...state,
            assignmentData: [...state.assignmentData.slice(0, action.index),
                            action.item,
                            ...state.assignmentData.slice(action.index + 1)]
        };


        case ADD_PROJECT:
            return {
                ...state,
                projectData: [...state.projectData, action.payload]
            };

        case REMOVE_PROJECT:
            return {
                ...state,
                assignmentData: [...state.projectData.slice(0, action.index),
                ...state.projectData.slice(action.index + 1)]
            };

        default:
            return state;
    }
}

export default rootReducer;