import { LOGIN } from '../Constants';
import { EMPLOYEE } from '../Constants';
import { PROJECT } from '../Constants';
import { ASSIGNMENT } from '../Constants';

const initialState = {
    currentUser:'',
    employeeData:[],
    assignmentData:[],
    projectData:[],
    
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN:
            return {...state, currentUser: action.payload};
        case EMPLOYEE:
            return {...state, 
                employeeData: [...state.employeeData, action.payload]
            };
        case ASSIGNMENT:
            return {...state, 
                assignmentData: [...state.assignmentData, action.payload]
            };
        case PROJECT:
            return {...state, 
                projectData: [...state.projectData, action.payload]
            };
        default:
            return state;
    }
}

export default rootReducer;