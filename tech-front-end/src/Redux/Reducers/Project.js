import { ADD_PROJECT } from '../Constants';
const initialState = {
    projectData: []
}
const projectReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_PROJECT:
            return {...state, 
                projectData: [...state.projectData, action.payload]
            }
        default:
            return state;
    }

}
export default projectReducer;