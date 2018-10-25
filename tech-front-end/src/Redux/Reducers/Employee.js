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
    ]
}
const employeeReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_EMPLOYEES:
            return { ...state,
                employees: [...action.payload]
            };
        case ADD_EMPLOYEE:
        console.log("Inside employee reducer add employee");
        console.log('Employee Data:',state.employees);
        return {...state, 
            employees: [...state.employees, action.payload]
        };
        case REMOVE_EMPLOYEE:
        // Need some action.index
            return {
                ...state,
                employees: [...state.employees.slice(0, action.index),
                                ...state.employees.slice(action.index + 1)]
            };
            case UPDATE_EMPLOYEE:
            return {
                ...state,
                employees: [...state.employees.slice(0, action.index),
                                action.payload,
                                ...state.employees.slice(action.index + 1)]
            };
        default:
            return state;
    }

}
export default employeeReducer; // Returns a state