import { ADD_PROJECT, REMOVE_PROJECT, UPDATE_PROJECT } from '../Constants';
const initialState = {
    projects: [{
        name:"AXOS",
        startDate:"2018-10-24",
        endDate:"2019-11-11"
    }]
}
const projectReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_PROJECT:
            return {...state, 
                projects: [...state.projects, action.payload]
            }
        case REMOVE_PROJECT:
            return {
                ...state,
                projects: [...state.projects.slice(0, action.index),
                ...state.projects.slice(action.index + 1)]
            };

        case UPDATE_PROJECT:
            return {
                ...state,
                projects: [...state.projects.slice(0, action.index),
                            action.payload,
                            ...state.projects.slice(action.index + 1)]
        };
        default:
            return state;
    }
}
export default projectReducer;