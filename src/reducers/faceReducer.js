import ActionTypes from '../actions/_types';

const INITIAL_STATE = {
  faces: [],
  isDetecting: false,
  error: null,
}

export default function faceReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.FACE_DETECT_REQUEST:
      return {
        ...state,
        isDetecting: true,
        error: null
      }
    case ActionTypes.FACE_DETECT_SUCCESS:
      return {
        ...state,
        isDetecting: false,
        faces: action.payload,
        error: null
      }
    case ActionTypes.FACE_DETECT_FAILURE:
      return {
        ...state,
        isDetecting: false,
        error: action.error
      }    
    default:
      return state;
  }
}
