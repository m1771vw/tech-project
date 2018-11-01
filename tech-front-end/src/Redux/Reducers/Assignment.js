import {
    ADD_ASSIGNMENT, REMOVE_ASSIGNMENT, UPDATE_ASSIGNMENT,
    GET_ALL_ASSIGNMENTS, GET_ALL_BLOCKED_ASSIGNMENTS, GET_ALL_ASSIGNMENTS_REVERSED,
    GET_ASSIGNMENT_BY_ID, GET_ASSIGNMENT_EMPLOYEES, GET_ASSIGNMENT_STATUS, ADD_EMPLOYEE_TO_ASSIGNMENT
} from '../Constants';

const initialState = {
    assignments: [],
    assignment: {},
    assignmentEmployees: [],
    assignmentStatus: [{}]
}
const assignmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_ASSIGNMENTS:
            return {
                ...state,
                assignments: [...action.payload]
            };
        case GET_ALL_ASSIGNMENTS_REVERSED:
            return {
                ...state,
                reversedAssignments: [...action.payload]
            };
        case GET_ASSIGNMENT_STATUS:
            return {
                ...state,
                assignmentStatus: [...action.payload]
            };
        case GET_ALL_BLOCKED_ASSIGNMENTS:
            return {
                ...state,
                blockedAssignments: [...action.payload]
            }
        case GET_ASSIGNMENT_BY_ID:
            return {
                ...state,
                assignment: action.payload
            };
        case GET_ASSIGNMENT_EMPLOYEES:
            return {
                ...state,
                assignmentEmployees: action.payload
            }
        case ADD_EMPLOYEE_TO_ASSIGNMENT:
            return {
                ...state,
                assignmentEmployees: [...state.assignmentEmployees, action.payload]
            }
        case ADD_ASSIGNMENT:
            return {
                ...state,
                assignments: [...state.assignments, action.payload]
            };
        case REMOVE_ASSIGNMENT:
            let index = state.assignments.findIndex(a => a.assignment_id === action.id)
            return {
                ...state,
                assignments: [
                    ...state.assignments.slice(0, index),
                    ...state.assignments.slice(index + 1)
                ],
                assignment: {}
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