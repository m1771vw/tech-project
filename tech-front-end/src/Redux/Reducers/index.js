import { CONSTANT } from '../Constants';

const initialState = {

}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case CONSTANT:
            return state;
        case "TEST":
        console.log("Test succeed");
            return state;
        default:
            return state;
    }
}

export default rootReducer;