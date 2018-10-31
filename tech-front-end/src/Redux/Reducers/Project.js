import {
    ADD_PROJECT, ADD_PROJECT_ROLE, REMOVE_PROJECT, UPDATE_PROJECT,
    GET_ALL_PROJECTS, GET_PROJECT_BY_ID, GET_ALL_PROJECT_ROLES,
    UPDATE_PROJECT_ROLES, REMOVE_PROJECT_ROLES, GET_EMPLOYEES_IN_PROJECT,
    GET_ASSIGNMENTS_IN_PROJECT, REMOVE_PROJECT_ASSIGNMENT, REMOVE_EMPLOYEE_FROM_PROJECT
} from '../Constants';
const initialState = {
    projects: [],
    project_role: [],
    project_by_id: {},
    projectEmployees: [{}],
    projectAssignments: [{}],
    
    // searchEmployees: [{}]
}
const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PROJECTS:
            return {
                ...state,
                projects: [...action.payload]
            };
        case GET_PROJECT_BY_ID:
            return {
                ...state,
                project_by_id: action.payload
            };
        case GET_EMPLOYEES_IN_PROJECT:
            return {
                ...state,
                projectEmployees: [...action.payload]
            };
        case REMOVE_EMPLOYEE_FROM_PROJECT:
            let index3 = state.projectEmployees.findIndex(e => e.employee_id === action.id);
            return {
                ...state,
                projectEmployees: [...state.projectEmployees.slice(0, index3),
                ...state.projectEmployees.slice(index3 + 1)]
            };
        case GET_ASSIGNMENTS_IN_PROJECT:
            return {
                ...state,
                projectAssignments: [...action.payload]
            };
        case REMOVE_PROJECT_ASSIGNMENT:
            // Need some action.index
            let index2 = state.projectAssignments.findIndex(a => a.assignment_id === action.id)
            return {
                ...state,
                projectAssignments: [
                    ...state.projectAssignments.slice(0, index2),
                    ...state.projectAssignments.slice(index2 + 1)
                ]
            };    
        case ADD_PROJECT:
            return {
                ...state,
                projects: [...state.projects, action.payload]
            };
        case ADD_PROJECT_ROLE:
            return {
                ...state,
                projectEmployees: [...state.projectEmployees, action.payload]
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
                project_role: [...state.project_role.slice(0, role_index),
                ...state.project_role.slice(role_index + 1)]
            };


        default:
            return state;
    }
}
export default projectReducer;