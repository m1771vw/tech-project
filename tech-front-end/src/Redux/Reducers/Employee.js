import { ADD_EMPLOYEE } from '../Constants';

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
        case ADD_EMPLOYEE:
        console.log("Inside employee reducer add employee");
            return {...state}
        default:
            return state;
    }

}
export default employeeReducer; // Returns a state