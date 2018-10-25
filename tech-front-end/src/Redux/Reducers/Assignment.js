import { ADD_ASSIGNMENT } from '../Constants';

const initialState = {
    assignmentData: []
}
const assignmentReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_ASSIGNMENT:
        return {...state, 
            assignmentData: [...state.assignmentData, action.payload]
        };
        default:
            return state;
    }
}
export default assignmentReducer;