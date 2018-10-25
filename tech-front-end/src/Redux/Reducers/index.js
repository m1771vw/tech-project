import { combineReducers } from 'redux';
import projectReducer from '../Reducers/Project';
import assignmentReducer from '../Reducers/Assignment';
import employeeReducer from '../Reducers/Employee';
import loginReducer from '../Reducers/Login';

/**
 * projectReducer: projectReducer
 * employeeReducer:employeeReducer
 * assignmentReducer: assignmentReducer
 * */
export default combineReducers({projectReducer, employeeReducer, assignmentReducer, loginReducer}) // combines all the states to state.projectReducer
