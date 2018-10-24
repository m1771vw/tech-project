import { ADD_EMPLOYEE } from '../Constants';

const initialState = {
    
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
export default employeeReducer;