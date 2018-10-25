import { ADD_ASSIGNMENT, REMOVE_ASSIGNMENT, UPDATE_ASSIGNMENT } from '../Constants';

const initialState = {
    assignmentData: [{
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
        case ADD_ASSIGNMENT:
        console.log("Inside ASSIGNMENT reducer add ASSIGNMENT");
        console.log('ASSIGNMENT Data:',state.assignmentData);
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
                action.payload,
                ...state.assignmentData.slice(action.index + 1)]
            };
        default:
            return state;
    }
}
export default assignmentReducer;