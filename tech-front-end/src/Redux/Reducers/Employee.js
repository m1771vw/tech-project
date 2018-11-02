import {
    ADD_EMPLOYEE,
    REMOVE_EMPLOYEE,
    UPDATE_EMPLOYEE,
    GET_ALL_EMPLOYEES,
    GET_EMPLOYEE_BY_ID,
    GET_ALL_EMPLOYEE_TO_ASSIGNMENT,
    GET_ALL_EMPLOYEE_ASSIGNMENTS,
    GET_ALL_EMPLOYEE_PROJECTS,
    SEARCH_EMPLOYEES,
    GET_ALL_EMPLOYEES_HOURS
} from "../Constants";

const initialState = {
    employees: [

    ],
    searchEmployees: [{
        value: '',
        text: ''
    }],
    getEmployeeById: {},
    getAllEmployeeAssignments: [{}],
    getAllEmployeesToAssignment: [{}],
    employee_projects: []
}
const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_EMPLOYEES:
            return {
                ...state,
                employees: [...action.payload]
            };

        case GET_ALL_EMPLOYEES_HOURS:
            return {
                ...state,
                getAllEmployeesHours: [...action.payload]
            };
            
        case ADD_EMPLOYEE:
            return {
                ...state,
                employees: [...state.employees, action.payload]
            };
        case SEARCH_EMPLOYEES:
            return {
                ...state,
                searchEmployees: [...action.payload]
            };
        case REMOVE_EMPLOYEE:
            let index = state.employees.findIndex(e => e.employee_id === action.id);
            return {
                ...state,
                employees: [...state.employees.slice(0, index),
                ...state.employees.slice(index + 1)]
            };
        case UPDATE_EMPLOYEE:
            let updateIndex = state.employees.findIndex(e => e.employee_id === action.id);
            return {
                ...state,
                employees: [...state.employees.slice(0, updateIndex),
                action.payload,
                ...state.employees.slice(updateIndex + 1)]
            };
        case GET_EMPLOYEE_BY_ID:
            return {
                ...state,
                getEmployeeById: action.payload
            };

        case GET_ALL_EMPLOYEE_TO_ASSIGNMENT:
            return {
                ...state,
                getAllEmployeesToAssignment: [...action.payload]
            };
        case GET_ALL_EMPLOYEE_ASSIGNMENTS:
            return {
                ...state,
                getAllEmployeeAssignments: [...action.payload]
            };
        case GET_ALL_EMPLOYEE_PROJECTS:
            return{
                ...state,
                employee_projects: action.payload
            }
        default:
            return state;
    }

};

export default employeeReducer; // Returns a state
