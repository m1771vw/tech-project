import { ADD_EMPLOYEE, REMOVE_EMPLOYEE, UPDATE_EMPLOYEE, GET_ALL_EMPLOYEES } from '../Constants';

const initialState = {
    employees: [
        {
            first_name: "William",
            last_name: "Yang",
            position: "Software Engineer"
        },
        {
            first_name: "James",
            last_name: "Park",
            position: "Software Engineer"
        },
        {
            first_name: "John",
            last_name: "Chu",
            position: "Software Engineer"
        },
        {
            first_name: "Pat",
            last_name: "Truong",
            position: "Manager"
        },
        {
            employee_id: 27,
            first_name: "CAN ",
            last_name: "YOU ",
            position: "FUCKING WORK"
        }
    ]
}
const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_EMPLOYEES:
            return {
                ...state,
                employees: [...action.payload]
            };
        case ADD_EMPLOYEE:
            console.log("Inside employee reducer add employee");
            console.log('Employee Data:', state.employees);
            return {
                ...state,
                employees: [...state.employees, action.payload]
            };
        case REMOVE_EMPLOYEE:
            // Need some action.index
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
        default:
            return state;
    }

}
export default employeeReducer; // Returns a state