import { LOGIN, LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT } from '../Constants';

const initialState = {
    currentUser: null,
    isAuthenticating: false, 
    token: null
}
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
          token: null,
          errorMessage: action.errorMessage
        }
      case LOGIN_SUCCESS:
        return {
          isAuthenticating: false,
          currentUser: action.user,
          token: action.token,
          errorMessage: null
        }
      case LOGOUT:
        return {
          isAuthenticating: false,
          currentUser: null,
          errorMessage: null
        } 
        default:
            return state;
}
}
export default loginReducer;