import ActionTypes from './_types';

// to login user
export const getUser = (emailId, password) => {
  return (dispatch) => {
    return new Promise((res, rej) => {
      dispatch(getUserRequest())
      if (emailId === 'test-email@test-email.com' && password === 'test-password') {
        const data = {
          emailId: 'test-email@test-email.com',
          name: 'test-user',
          id: 'some-random-uuid'
        }
        dispatch(getUserSuccess(data))        
        res(true)
      } else {
        const err = {
          err: 'INVALID_CREDS'
        }
        dispatch(getUserFailure(err))
        res(false)
      }
    })            
  }
}

const getUserRequest = () => ({
  type: ActionTypes.GET_USER_REQUEST,
})

const getUserSuccess = (payload) => ({
  type: ActionTypes.GET_USER_SUCCESS,
  payload,
})

const getUserFailure = (err) => ({
  type: ActionTypes.GET_USER_FAILURE,
  error: err,
})

// to logout user
export const logoutUser = (history)  => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.LOGOUT_USER_REQUEST,
    })
    const newLocation = {
      pathname: '/',
    }
    history.push(newLocation);
  }  
}
