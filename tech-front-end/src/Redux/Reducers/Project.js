import { ADD_PROJECT, REMOVE_PROJECT, UPDATE_PROJECT, GET_ALL_PROJECTS, GET_ALL_PROJECT_ROLES, UPDATE_PROJECT_ROLES, REMOVE_PROJECT_ROLES } from '../Constants';
const initialState = {
    projects: [{
        name: "AXOS",
        startDate: "2018-10-24",
        endDate: "2019-11-11"
    }],
    project_role: [{
        role: '???',

    }]
}
const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PROJECTS:
            return {
                ...state,
                projects: [...action.payload]
            };
        case ADD_PROJECT:
            return {
                ...state,
                projects: [...state.projects, action.payload]
            };
        case REMOVE_PROJECT:
            let index = state.projects.findIndex(p => p.project_id === action.id)
            return {
                ...state,
                projects: [...state.projects.slice(0, index),
                ...state.projects.slice(index + 1)]
            };

        case UPDATE_PROJECT:
            let updateIndex = state.projects.findIndex(p => p.project_id === action.id)
            return {
                ...state,
                projects: [...state.projects.slice(0, updateIndex),
                action.payload,
                ...state.projects.slice(updateIndex + 1)]
            };

        case GET_ALL_PROJECT_ROLES:
            return {
                ...state,
                project_role: [...action.payload]
            };
        case UPDATE_PROJECT_ROLES:
            let roleUpdateIndex = state.project_role.findIndex(pr => pr.project_role_id === action.id)
            return {
                ...state,
                project_role: [...state.project_role.slice(0, roleUpdateIndex),
                action.payload,
                ...state.project_role.slice(roleUpdateIndex + 1)]
            };
        case REMOVE_PROJECT_ROLES:
            let role_index = state.project_role.find(pr => pr.project_role_id === action.id)
            return {
                ...state,
                project_role: [...state.project_role.slice(0, role_index) ,
                ...state.project_role.slice(role_index + 1)]
            };     


        default:
            return state;
    }
}
export default projectReducer;