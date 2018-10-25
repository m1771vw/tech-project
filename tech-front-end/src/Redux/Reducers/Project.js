import { ADD_PROJECT, REMOVE_PROJECT, UPDATE_PROJECT } from '../Constants';
const initialState = {
    projectData: [{
        name:"AXOS",
        startDate:"2018-10-24",
        endDate:"2019-11-11"
    }]
}
const projectReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_PROJECT:
            return {...state, 
                projectData: [...state.projectData, action.payload]
            }
        case REMOVE_PROJECT:
            return {
                ...state,
                assignmentData: [...state.projectData.slice(0, action.index),
                ...state.projectData.slice(action.index + 1)]
            };

        case UPDATE_PROJECT:
            return {
                ...state,
                projectData: [...state.projectData.slice(0, action.index),
                            action.payload,
                            ...state.projectData.slice(action.index + 1)]
        };
        default:
            return state;
    }
}
export default projectReducer;