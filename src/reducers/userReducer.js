import ActionTypes from '../actions/_types';
import axios from 'axios';

const userInfo = localStorage.userInfo ? JSON.parse(localStorage.userInfo) : {};

const INITIAL_STATE = {
  userInfo: {
    emailId: userInfo.emailId || '',
    name: userInfo.name || '',
    id: userInfo.id || ''
  },
  isLoggedIn: userInfo.id ? true : false
}

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.GET_USER_SUCCESS:      
      axios.defaults.headers.common['Content-Type'] = 'application/json';
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      return {
        ...state,
        userInfo: {
          ...action.payload,
        },
        isLoggedIn: true
      };
    case ActionTypes.LOGOUT_USER_REQUEST:      
      localStorage.removeItem("userInfo");
      return {
        ...INITIAL_STATE,
        isLoggedIn: false
      };
    default:
      return state;
  }
}
