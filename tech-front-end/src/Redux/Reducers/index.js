import { LOGIN } from '../Constants';
import { ADD_EMPLOYEE, 
        REMOVE_EMPLOYEE, 
        UPDATE_EMPLOYEE,
        ADD_PROJECT,
        REMOVE_PROJECT,
        UPDATE_PROJECT, 
        ADD_ASSIGNMENT, 
        REMOVE_ASSIGNMENT,
        UPDATE_ASSIGNMENT
       
    } from '../Constants';


const initialState = {
    currentUser: '',
    employeeData: [
        { id: 1, 
        name: "amy", 
        title: "Senior engineer ", 
        project: "B.com", 
        profile: "wd.com" },
      { id: 2, 
        name: "bob", 
        title: "Mid engineer ", 
        project: "B.com", 
        profile: "wc.com" },
      { id: 3, 
        name: "charles", 
        title: "Junior engineer ", 
        project: "A.com", 
        profile: "ww.com" }

    ],
    assignmentData: [{
        name: "Test Assignment1",
        startDate: "2017-10-18",
        endDate: "2017-10-21",
        estHours: "1",
        elapsHours: "1"
    },{
        name: "Test Assignment2",
        startDate: "2017-10-21",
        endDate: "2017-10-21",
        estHours: "1",
        elapsHours: "1"
    },{
        name: "Test Assignmen3t",
        startDate: "2017-10-16",
        endDate: "2017-10-21",
        estHours: "1",
        elapsHours: "1"
    }
    ],
    projectData: [{
        name:"AXOS",
        startDate:"2018-10-24",
        endDate:"2019-11-11"
    }]
    
}
    



// Create action.types for DELETE_EMPLOYEE...etc.
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, currentUser: action.payload };
        case ADD_EMPLOYEE:
            return {
                ...state,
                employeeData: [...state.employeeData, action.payload]
            };

        case REMOVE_EMPLOYEE:
            return {
                ...state,
                employeeData: [...state.employeeData.slice(0, action.index),
                ...state.employeeData.slice(action.index + 1)]
            };

        case UPDATE_EMPLOYEE:
        return {
            ...state,
            employeeData: [...state.employeeData.slice(0, action.index),
                            action.payload,
                            ...state.employeeData.slice(action.index + 1)]
        };

        case ADD_ASSIGNMENT:
            return {
                ...state,
                assignmentData: [...state.assignmentData, action.payload]
            };

        case REMOVE_ASSIGNMENT:
            // Need some action.index
            return {
                ...state,
                assignmentData: [...state.assignmentData.slice(0, action.index),
                ...state.assignmentData.slice(action.index + 1)]
            };

        case UPDATE_ASSIGNMENT:
            return {
            ...state,
            assignmentData: [...state.assignmentData.slice(0, action.index),
                            action.payload,
                            ...state.assignmentData.slice(action.index + 1)]
        };


        case ADD_PROJECT:
            return {
                ...state,
                projectData: [...state.projectData, action.payload]
            };

        case REMOVE_PROJECT:
            return {
                ...state,
                assignmentData: [...state.projectData.slice(0, action.index),
                ...state.projectData.slice(action.index + 1)]
            };

        case UPDATE_PROJECT:
            return {
                ...state,
                projectData: [...state.projectData.slice(0, action.index),
                            action.payload,
                            ...state.projectData.slice(action.index + 1)]
        };

        default:
            return state;
    }
}

export default rootReducer;