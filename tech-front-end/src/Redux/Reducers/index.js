import { LOGIN } from '../Constants';
import { ADD_EMPLOYEE, ADD_PROJECT, ADD_ASSIGNMENT } from '../Constants';


const initialState = {
    currentUser:'',
    employeeData:[],
    assignmentData:[],
    projectData:[],
    
}



// Create action.types for DELETE_EMPLOYEE...etc.
const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN:
            return {...state, currentUser: action.payload};
        case ADD_EMPLOYEE:
            return {...state, 
                employeeData: [...state.employeeData, action.payload]
            };
        case ADD_ASSIGNMENT:
            return {...state, 
                assignmentData: [...state.assignmentData, action.payload]
            };
        case ADD_PROJECT:
            return {...state, 
                projectData: [...state.projectData, action.payload]
            };
        default:
            return state;
    }
}

export default rootReducer;