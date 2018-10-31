import axios from "axios";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    GET_ALL_ASSIGNMENTS,
    GET_ALL_BLOCKED_ASSIGNMENTS,
    GET_ASSIGNMENT_STATUS,
    GET_ALL_EMPLOYEES,
    GET_ALL_PROJECTS,
    GET_ALL_PROJECT_ROLES,
    GET_ASSIGNMENT_BY_ID,
    GET_ASSIGNMENT_EMPLOYEES,
    GET_ALL_EMPLOYEE_TO_ASSIGNMENT,
    GET_ALL_EMPLOYEE_ASSIGNMENTS,
    GET_PROJECT_BY_ID,
    ADD_ASSIGNMENT,
    ADD_EMPLOYEE,
    ADD_PROJECT,
    ADD_PROJECT_ROLE,
    ADD_EMPLOYEE_TO_ASSIGNMENT,
    REMOVE_ASSIGNMENT,
    REMOVE_PROJECT_ASSIGNMENT,
    REMOVE_EMPLOYEE_FROM_PROJECT,
    REMOVE_EMPLOYEE,
    REMOVE_PROJECT,
    REMOVE_PROJECT_ROLES,
    UPDATE_ASSIGNMENT,
    UPDATE_EMPLOYEE,
    UPDATE_PROJECT,
    UPDATE_PROJECT_ROLES,
    GET_EMPLOYEES_IN_PROJECT,
    GET_ASSIGNMENTS_IN_PROJECT,
    GET_EMPLOYEE_BY_ID,
    SEARCH_EMPLOYEES
}
    from '../Constants';

import jwtDecode from 'jwt-decode';
/**
 * Login Actions
 */

export const submitLogout = () => async dispatch => {
    delete localStorage.authToken
    delete localStorage.currentUser
    delete localStorage.isAuthorized
    dispatch({ type: LOGOUT })
}
export const submitLogin = loginBody => async dispatch => {
    let username = loginBody.username;
    let password = loginBody.password;
    try {
        dispatch({ type: LOGIN_REQUEST })
        console.log("ACTION: SUBMIT LOGIN: ", loginBody);
        let response = await axios.post('http://localhost:5000/api/login', null, {
            auth: {
                username,
                password
            }
        });
        console.log("Submit LoginResponse:", response);
        console.log("Decode JWTToken:", jwtDecode(response.data.token).id)
        localStorage.authToken = response.data.token
        localStorage.isAuthorized = true
        localStorage.currentUser = jwtDecode(response.data.token).id

        dispatch({ type: LOGIN_SUCCESS, user: jwtDecode(response.data.token).id })
    } catch (e) {
        dispatch({
            type: LOGIN_FAILURE,
            errorMessage: e.response && e.response.data
        })
        if (e.response !== undefined) console.log("ERROR:", e.response.data);
    }
}

/**
 * Assignment Actions
 */
export const getStatusTypes = () => async dispatch => {
    try {
        let response = await axios.get('http://localhost:5000/api/statustypes/all', {
            headers: {
                'Authorization': `bearer ${localStorage.authToken}`
            }
        });
        let newArray = response.data.statusTypes.map((x) => ({
            key: x.status_id,
            value: x.status_id,
            text: x.status_name,
        }))
        console.log('PROJECT ASSIGNMENTS: ', newArray)
        dispatch({ type: GET_ASSIGNMENT_STATUS, payload: newArray })
    } catch (e) {
        console.log('Status Type Error :', e)
    }
}



export const getAllAssignments = () => async dispatch => {
    try {
        let response = await axios.get('http://localhost:5000/api/assignments/all', {
            headers: {
                'Authorization': `bearer ${localStorage.authToken}`
            }
        });
        dispatch({ type: GET_ALL_ASSIGNMENTS, payload: response.data.assignments })

    } catch (e) {
        console.log("Get All Assignment Error", e.response.data);
    }
}

export const getAllAssignmentsOrdered = () => async dispatch => {
    try {
        let response = await axios.get('http://localhost:5000/api/assignments/all/ascending', {
            headers: {
                'Authorization': `bearer ${localStorage.authToken}`
            }
        });
        dispatch({ type: GET_ALL_ASSIGNMENTS, payload: response.data.assignments })
    } catch (e) {
        console.log("Get All Assignment Error", e.response.data);
    }
}

export const getAllAssignmentsBlocked = () => async dispatch => {
    try {
        let response = await axios.get('http://localhost:5000/api/assignments/all/blocked', {
            headers: {
                'Authorization': `bearer ${localStorage.authToken}`
            }
        });
        dispatch({ type: GET_ALL_BLOCKED_ASSIGNMENTS, payload: response.data.assignments })
    } catch (e) {
        console.log("Get All Assignment Error", e.response.data);
    }
}

export const getAllAssignmentsReversed = () => async dispatch => {
    try {
        let response = await axios.get('http://localhost:5000/api/assignments/all', {
            headers: {
                'Authorization': `bearer ${localStorage.authToken}`
            }
        });
        console.log("ACTION: Reverse All Assignments: ");
        dispatch({ type: GET_ALL_ASSIGNMENTS, payload: response.data.assignments.reverse() })
    } catch (e) {
        console.log("Get All Assignment Error", e.response.data);
    }
}

export const getAssignmentById = id => async dispatch => {
    try {
        let response = await axios.get(`http://localhost:5000/api/assignments/id/${id}`, {
            headers: {
                'Authorization': `bearer ${localStorage.authToken}`
            }
        });
        // console.log("Single Assignment Response: ", response);
        dispatch({ type: GET_ASSIGNMENT_BY_ID, payload: response.data.assignment })
    } catch (e) {
        console.log("Get Single Assignment Error", e);
    }
}

export const getAssignmentEmployees = id => async dispatch => {
    try {
        let response = await axios.get(`http://localhost:5000/api/employees/all/assignments/a_id/${id}`, {
            headers: {
                'Authorization': `bearer ${localStorage.authToken}`
            }
        });
        // console.log("Employess to an Assignment Response: ", response);
        dispatch({ type: GET_ASSIGNMENT_EMPLOYEES, payload: response.data.assignment_employees })
    } catch (e) {
        console.log("Get Single Assignment Error", e);
    }
}
export const submitAssignment = assignment => async dispatch => {
    try {
        let { employee_id, ...newAssignment } = assignment
        console.log("Trying to submit to assignment:", assignment);
        let response = await axios.post('http://localhost:5000/api/assignments', assignment, {
            headers: {
                'Authorization': `bearer ${localStorage.authToken}`
            }
        });
        dispatch({ type: ADD_ASSIGNMENT, payload: response.data.assignment })
        let newEmpAssign = {
            employee_id: assignment.employee_id,
            assignment_id: response.data.assignment.assignment_id
        }
        let response2 = await axios.post(`http://localhost:5000/api/employees/${employee_id}/assignments`, newEmpAssign, {
            headers: {
                'Authorization': `bearer ${localStorage.authToken}`
            }
        });
        console.log('SUBMITTING EMPLOYEE TO ASSIGNMENT: ', response2);
        dispatch({ type: ADD_EMPLOYEE_TO_ASSIGNMENT, payload: response2.data.employee_assignment })
    } catch (e) {
        console.log("ERROR:", e)
    }
}

export const deleteAssignment = id => async dispatch => {
    try {
        console.log('DELETEING ID#: ', id)
        let { data } = await axios.delete(`http://localhost:5000/api/assignments/${id}`, {
            headers: {
                'Authorization': `bearer ${localStorage.authToken}`
            }
        });
        dispatch({ type: REMOVE_PROJECT_ASSIGNMENT, id: data.message.assignment_id })
    } catch (e) {
        console.log("ERROR:", e)
    }
}

export const updateAssignment = (assignment, id) => async dispatch => {
    try {
        let response = await axios.put(`http://localhost:5000/api/assignments/id/${id}`, assignment, {
            headers: {
                'Authorization': `bearer ${localStorage.authToken}`
            }
        });
        console.log('RESPONSE: ', response)
        dispatch({ type: UPDATE_ASSIGNMENT, payload: response.data.message, id })
    } catch {
        console.log("ERROR")
    }
}

/**
 * Employee Actions
 */

export const getAllEmployees = () => async dispatch => {
    try {
        let response = await axios.get('http://localhost:5000/api/employees/all', {
            headers: {
                'Authorization': `bearer ${localStorage.authToken}`
            }
        });
        let newArray = response.data.employees.map((x) => ({
            key: x.employee_id,
            value: x.employee_id,
            text: `${x.first_name} ${x.last_name}`
        }))
        dispatch({ type: GET_ALL_EMPLOYEES, payload: response.data.employees })
        dispatch({ type: SEARCH_EMPLOYEES, payload: newArray })
    } catch (e) {
        console.log("Get All Employee Error", e);
    }
}

export const getEmployeeById = id => async dispatch => {
    try {
        let response = await axios.get(
            `http://localhost:5000/api/employees/id/${id}`
            , {
                headers: {
                    'Authorization': `bearer ${localStorage.authToken}`
                }
            });
        dispatch({ type: GET_EMPLOYEE_BY_ID, payload: response.data.employee });
    } catch (e) {
        console.log("Get Single Employee Error", e);
    }
};

export const getAllEmployeesToAssignment = id => async dispatch => {
    try {
        let response = await axios.get(
            `http://localhost:5000/api/employees/all/assignments/a_id/${id}`
            , {
                headers: {
                    'Authorization': `bearer ${localStorage.authToken}`
                }
            });
        console.log("Assignment to all Employees Response: ", response);
        dispatch({
            type: GET_ALL_EMPLOYEE_TO_ASSIGNMENT,
            payload: response.data.assignment_employees
        });
    } catch (e) {
        console.log("Get Employees in Assignment Error", e);
    }
};

export const getAllEmployeeAssignments = id => async dispatch => {
    try {
        let response = await axios.get(
            `http://localhost:5000/api/employees/${id}/assignments/all`
            , {
                headers: {
                    'Authorization': `bearer ${localStorage.authToken}`
                }
            });
        console.log("Assignments to the Employee Response: ", response);
        dispatch({
            type: GET_ALL_EMPLOYEE_ASSIGNMENTS,
            payload: response.data.employee_assignments
        });
    } catch (e) {
        console.log("Get Single Assignment Error", e);
    }
};

export const submitEmployee = employee => async dispatch => {
    try {
        console.log("Trying to submit employee:", employee)
        let response = await axios.post('http://localhost:5000/api/employees/', employee, {
            headers: {
                'Authorization': `bearer ${localStorage.authToken}`
            }
        });
        console.log("New Response:", response);
        dispatch({ type: ADD_EMPLOYEE, payload: response.data.employee })
    } catch {
        console.log("ERROR")
    }
}

export const deleteEmployee = id => async dispatch => {
    try {
        // hard coded for now since getall does not exist
        // let id = 31;
        await axios.delete(`http://localhost:5000/api/employees/${id}`, {
            headers: {
                'Authorization': `bearer ${localStorage.authToken}`
            }
        });
        dispatch({ type: REMOVE_EMPLOYEE, id })
    } catch (e) {
        console.log("ERROR:", e)
    }
}

export const deleteEmployeeFromProject = id => async dispatch => {
    try {
        await axios.delete(`http://localhost:5000/api/projects/roles/${id}`, {
            headers: {
                'Authorization': `bearer ${localStorage.authToken}`
            }
        });
        dispatch({ type: REMOVE_EMPLOYEE_FROM_PROJECT, id })
    } catch (e) {
        console.log('ERROR:', e)
    }
}

export const updateEmployee = (employee, id) => async dispatch => {
    try {
        let response = await axios.put(`http://localhost:5000/api/employees/id/${id}`, employee, {
            headers: {
                'Authorization': `bearer ${localStorage.authToken}`
            }
        });
        console.log('RESPONSE:', response)
        dispatch({ type: UPDATE_EMPLOYEE, payload: response.data.employee, id })
    } catch (e) {
        console.log("ERROR:", e)
    }
}

/**
 *  Project Actions
 */
export const getAllProjects = () => async dispatch => {
    try {
        let response = await axios.get('http://localhost:5000/api/projects/all', {
            headers: {
                'Authorization': `bearer ${localStorage.authToken}`
            }
        });
        console.log("ACTION: ALL PROJECTS Response: ", response);
        dispatch({ type: GET_ALL_PROJECTS, payload: response.data.projects })
    } catch (e) {
        console.log("Get All Projects Error", e);
    }
}

export const getProjectById = id => async dispatch => {
    try {
        let response = await axios.get(`http://localhost:5000/api/projects/id/${id}`, {
            headers: {
                'Authorization': `bearer ${localStorage.authToken}`
            }
        });
        dispatch({ type: GET_PROJECT_BY_ID, payload: response.data.project })
    } catch (e) {
        console.log('ERROR MESSAGE PROJ.ID: ', e)
    }
}

export const getEmployeesInProject = id => async dispatch => {
    try {
        let response = await axios.get(`http://localhost:5000/api/projects/id/${id}/employees`, {
            headers: {
                'Authorization': `bearer ${localStorage.authToken}`
            }
        });
        // console.log('THIS IS THE RESPONSE: ', response)
        dispatch({ type: GET_EMPLOYEES_IN_PROJECT, payload: response.data.employees })
    } catch (e) {
        console.log('ERROR MESSAGE GETTING EMPLOYEES IN PROJECT: ', e)
    }
}

export const getAssignmentsInProject = id => async dispatch => {
    try {
        let response = await axios.get(`http://localhost:5000/api/projects/id/${id}/assignments`, {
            headers: {
                'Authorization': `bearer ${localStorage.authToken}`
            }
        });
        console.log('assignment response: ', response)
        dispatch({ type: GET_ASSIGNMENTS_IN_PROJECT, payload: response.data.assignments })
        // dispatch({ type: GET_ASSIGNMENT_STATUS, payload: newArray})
    } catch (e) {
        console.log('ERROR MESSAGE GETTING ASSIGNMENTS IN PROJECT: ', e)
    }
}

export const submitProject = project => async dispatch => {
    try {
        let response = await axios.post('http://localhost:5000/api/projects/', project, {
            headers: {
                'Authorization': `bearer ${localStorage.authToken}`
            }
        });
        console.log(response);
        dispatch({ type: ADD_PROJECT, payload: response.data.project })
    } catch (e) {
        console.log("ERROR:", e)
    }
}

export const deleteProject = id => async dispatch => {
    try {
        await axios.delete(`http://localhost:5000/api/projects/${id}`, {
            headers: {
                'Authorization': `bearer ${localStorage.authToken}`
            }
        });
        dispatch({ type: REMOVE_PROJECT, id })
    } catch (e) {
        console.log("ERROR", e)
    }
}

export const updateProject = (project, id) => async dispatch => {
    try {
        let id = 13;
        let response = await axios.put(`http://localhost:5000/api/projects/${id}`, project, {
            headers: {
                'Authorization': `bearer ${localStorage.authToken}`
            }
        });
        dispatch({ type: UPDATE_PROJECT, payload: response.data.message, id })
    } catch (e) {
        console.log("ERROR:", e)
    }
}

export const getAllProjectRoles = () => async dispatch => {
    try {
        let response = await axios.get('http://localhost:5000/api/projects/roles/all', {
            headers: {
                'Authorization': `bearer ${localStorage.authToken}`
            }
        });
        console.log("GET PROJECT ROLES:", response)
        dispatch({ type: GET_ALL_PROJECT_ROLES, payload: response.data.role })
    } catch (e) {
        console.log("Get All Project Roles Error: ", e);
    }
}

export const submitProjectRole = role => async dispatch => {
    try {
        let response = await axios.post(`http://localhost:5000/api/projects/roles/`, role, {
            headers: {
                'Authorization': `bearer ${localStorage.authToken}`
            }
        });
        console.log('Adding project role: ', response)
        dispatch({ type: ADD_PROJECT_ROLE, payload: response.data.project_role })
    } catch (e) {
        console.log('Submit Project Role Error: ', e);
    }
}

export const updateProjectRole = (project_role, id) => async dispatch => {
    try {
        let id = 9;
        let response = await axios.put(`http://localhost:500/api/projects/roles/${id}`, project_role, {
            headers: {
                'Authorization': `bearer ${localStorage.authToken}`
            }
        });
        dispatch({ type: UPDATE_PROJECT_ROLES, payload: response.data.message, id })
    } catch (e) {
        console.log('ERROR AT', e)
    }
}

export const deleteProjectRole = id => async dispatch => {
    try {
        let id = 10;
        await axios.delete(`http://localhost:5000/api/projects/roles/${id}`, {
            headers: {
                'Authorization': `bearer ${localStorage.authToken}`
            }
        });
        dispatch({ type: REMOVE_PROJECT_ROLES, id })
    } catch (e) {
        console.log("ERROR:", e)
    }
}

