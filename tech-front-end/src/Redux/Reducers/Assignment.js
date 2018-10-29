import { ADD_ASSIGNMENT, REMOVE_ASSIGNMENT, UPDATE_ASSIGNMENT, 
    GET_ALL_ASSIGNMENTS, GET_ASSIGNMENT_BY_ID, GET_ASSIGNMENT_EMPLOYEES } from '../Constants';

const initialState = {
    assignments: [],
    assignment: {},
    assignmentEmployees: []
}
const assignmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_ASSIGNMENTS:
            return {
                ...state,
                assignments: [...action.payload]
            };
        case GET_ASSIGNMENT_BY_ID:
        console.log("Inside Assignment Reducer, GET_ASSIGNMENT_BY_ID:",action.payload);
            return {
                ...state,
                assignment: action.payload
            };
        case GET_ASSIGNMENT_EMPLOYEES:
            return {
                ...state,
                assignmentEmployees: action.payload
            }
        case ADD_ASSIGNMENT:
        console.log("Inside ASSIGNMENT reducer add ASSIGNMENT");
        console.log('ASSIGNMENT Data:',state.assignments);
            return {
                ...state,
                assignments: [...state.assignments, action.payload]
            };
        case REMOVE_ASSIGNMENT:
            // Need some action.index
            let index = state.assignments.findIndex(a => a.assignment_id === action.id)
            return {
                ...state,
                assignments: [...state.assignments.slice(0, index),
                ...state.assignments.slice(index + 1)]
            };

        case UPDATE_ASSIGNMENT:
            let updateIndex = state.assignments.findIndex(a => a.assignment_id === action.id);
            return {
                ...state,
                assignments: [...state.assignments.slice(0, updateIndex),
                action.payload,
                ...state.assignments.slice(updateIndex + 1)]
            };
        default:
            return state;
    }
}
export default assignmentReducer;