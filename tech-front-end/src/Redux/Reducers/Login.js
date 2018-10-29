import { LOGIN } from '../Constants';

const initialState = {
    currentUser: null,
    isAuthenticating: false, 
    token: null
}
const loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN:
            return {...state, currentUser: action.payload};
        default:
            return state;
    }
}
export default loginReducer;