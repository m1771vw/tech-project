import { ADD_PROJECT } from '../Constants';
const initialState = {
    
}
const projectReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_PROJECT:
        console.log("Inside project reducer add project");
            return {...state}
        default:
            return state;
    }

}
export default projectReducer;