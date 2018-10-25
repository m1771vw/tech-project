import { ADD_ASSIGNMENT, REMOVE_ASSIGNMENT, UPDATE_ASSIGNMENT, GET_ALL_ASSIGNMENTS } from '../Constants';

const initialState = {
    assignments: [{
        name: "Test Assignment1",
        startDate: "2017-10-18",
        endDate: "2017-10-21",
        estHours: "1",
        elapsHours: "1"
    }, {
        name: "Test Assignment2",
        startDate: "2017-10-21",
        endDate: "2017-10-21",
        estHours: "1",
        elapsHours: "1"
    }, {
        name: "Test Assignmen3t",
        startDate: "2017-10-16",
        endDate: "2017-10-21",
        estHours: "1",
        elapsHours: "1"
    }]
}
const assignmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_ASSIGNMENTS:
            return {
                ...state,
                assignments: [...action.payload]
            };
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