import {
  ADD_EMPLOYEE,
  REMOVE_EMPLOYEE,
  UPDATE_EMPLOYEE,
  GET_ALL_EMPLOYEES,
  GET_EMPLOYEE_BY_ID,
  GET_ALL_EMPLOYEE_TO_ASSIGNMENT,
  GET_ALL_EMPLOYEE_ASSIGNMENTS
} from "../Constants";

const initialState = {
    employees: [

    ],
    getEmployeeById:{},
    getAllEmployeeAssignments:[{}],
    getAllEmployeesToAssignment:[{}]
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
            console.log("Payload:" ,action.payload);
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
            case GET_EMPLOYEE_BY_ID:
            console.log(
              "Inside Employee Reducer, GET_EMPLOYEE_BY_ID:",
              action.payload
            );
            return {
              ...state,
              getEmployeeById: action.payload
            };
      
          case GET_ALL_EMPLOYEE_TO_ASSIGNMENT:
            console.log(
              "Inside Employee Reducer, GET_ALL_EMPLOYEE_TO_ASSIGNMENT:",
              action.payload
            );
            return {
              ...state,
              getAllEmployeesToAssignment: [...action.payload]
            };
          case GET_ALL_EMPLOYEE_ASSIGNMENTS:
            console.log(
              "Inside Employee Reducer, GET EMPLOYEE ASSIGNMENT:",
              action.payload
            );
            return {
              ...state,
              getAllEmployeeAssignments: [...action.payload]
            };
        default:
            return state;
    }
  
};

export default employeeReducer; // Returns a state
