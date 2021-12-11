import { combineReducers } from "redux"

const initialState = {
  currentUser: null,
}

const auth = (state = initialState, action) => {
  switch (action.type){
    case 'LOGIN':
      return{
        ...state,
        currentUser: action.payload
      }
    default:
      return state
  }
}

export default combineReducers({
  auth
});