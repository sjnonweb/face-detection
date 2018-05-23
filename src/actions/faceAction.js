import ActionTypes from './_types';
import axios from 'axios';

// to detect a face
export const detectFace = (file) => {
  return (dispatch) => {
    dispatch(detectFaceRequest());
    const faceApiUrl = 'https://api.kairos.com/detect'
    const data = {
      image: file
    };
    const config = {
      headers: {
        'app_id': '212bb7c6',
        'app_key': '2f5a22715a7ec676a0790a39b31f149a',
      }
    }
    return axios.post(faceApiUrl, data, config)
      .then((response) => {
        console.log(response);
        if(response.data.Errors) {
          dispatch(detectFaceFailure(response.data.Errors));
        } else if (response.data.images) {
          console.log(response.data.images[0].faces)
          dispatch(detectFaceSuccess(response.data.images[0].faces));
        }
      })
      .catch((error) => {
        console.error(error)
        dispatch(detectFaceFailure(error))
      })
  }
}

const detectFaceRequest = () => ({
  type: ActionTypes.FACE_DETECT_REQUEST,
})

const detectFaceSuccess = (payload) => ({
  type: ActionTypes.FACE_DETECT_SUCCESS,
  payload,
})

const detectFaceFailure = (error) => ({
  type: ActionTypes.FACE_DETECT_FAILURE,
  error,
})
