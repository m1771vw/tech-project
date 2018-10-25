import { ADD_EMPLOYEE, REMOVE_EMPLOYEE } from '../Constants';

const initialState = {
    employeeData: [
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
        case ADD_EMPLOYEE:
        console.log("Inside employee reducer add employee");
        console.log('Employee Data:',state.employeeData);
        return {...state, 
            employeeData: [...state.employeeData, action.payload]
        };
        case REMOVE_EMPLOYEE:
        // Need some action.index
            return {
                ...state,
                employeeData: [...state.employeeData.slice(0, action.index),
                                ...state.employeeData.slice(action.index + 1)]
            };
        // case UPDATE_EMPLOYEE:
        // return {
        //     ...state,
        //     employeeData: [...state.employeeData.slice(0, action.index),
        //                     employeeData,
        //                     ...state.employeeData.slice(action.index + 1)]
        // };
        default:
            return state;
    }

}
export default employeeReducer; // Returns a state