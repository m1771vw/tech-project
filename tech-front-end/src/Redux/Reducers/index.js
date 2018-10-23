import { LOGIN } from '../Constants';

const initialState = {
    currentUser:'',
    
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN:
            return {...state, currentUser: action.payload};
        default:
            return state;
    }
}

export default rootReducer;