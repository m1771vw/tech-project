import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT } from '../Constants';
import jwtDecode from 'jwt-decode';


const initialState = (token => ({
    currentUser: token ? jwtDecode(token).id : null,
    isAuthenticating: false, 
    errorMessage: null
}))(localStorage.authToken)

const loginReducer = (state = initialState, action) => {
    // console.log("LOGIN REDUCER: ", action);
    switch(action.type) {
        case LOGIN_REQUEST:
        return {
          ...state,
          isAuthenticating: true
        }
      case LOGIN_FAILURE:

        return {
          ...state,
          isAuthenticating: false,
          errorMessage: action.errorMessage
        }
      case LOGIN_SUCCESS:
        return {
          ...state,
          isAuthenticating: false,
          currentUser: action.user,
          errorMessage: null
        }
      case LOGOUT:
        return {
          ...state,
          isAuthenticating: false,
          currentUser: null,
          errorMessage: null
        } 
        default:
            return state;
}
}
export default loginReducer;