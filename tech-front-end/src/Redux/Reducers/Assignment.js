import { ADD_ASSIGNMENT, REMOVE_ASSIGNMENT, UPDATE_ASSIGNMENT, 
    GET_ALL_ASSIGNMENTS, GET_ALL_BLOCKED_ASSIGNMENTS, GET_ALL_ASSIGNMENTS_REVERSED,
    GET_ASSIGNMENT_BY_ID, GET_ASSIGNMENT_EMPLOYEES, GET_ASSIGNMENT_STATUS,GET_ALL_ASSIGNMENT_COMMENTS, ADD_ASSIGNMENT_COMMENT, 
    UPDATE_ASSIGNMENT_COMMENT, DELETE_ASSIGNMENT_COMMENT } from '../Constants';

const initialState = {
    assignments: [],
    assignment: {},
    assignmentEmployees: [],
    assignmentStatus:[{}],
    assignment_comments: []
}
const assignmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_ASSIGNMENTS:
        console.log("REDUCER: Assignment - GET ALL ASSIGNMENTS");
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
        console.log('REDUCER: GET ASSIGNMENT STATUS', action.payload)
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

        case GET_ALL_ASSIGNMENT_COMMENTS:
            return {
                ...state,
                assignment_comments: action.payload
            }
        case ADD_ASSIGNMENT_COMMENT:
            return {
                ...state,
                assignment_comments: [...state.assignment_comments, action.payload]
            }
        case UPDATE_ASSIGNMENT_COMMENT:
        let updateIndex = state.assignment_comments.findIndex(a => a.assignment_comments_id === action.id)
        return {
            ...state,
            assignment_comments: [...state.assignment_comments.slice(0, updateIndex),
            action.payload,
            ...state.assignment_comments.slice(updateIndex + 1)]
        };
        case DELETE_ASSIGNMENT_COMMENT:
        let index = state.assignment_comments.findIndex(a => a.assignment_comments_id === action.id)
        return {
            ...state,
            assignment_comments: [...state.assignment_comments.slice(0, index),
            ...state.assignment_comments.slice(index + 1)]
        };
        default:
            return state;
    }
}
export default assignmentReducer;