import {
  USER_LOGIN,
 } from '../../constants'

const initialState = {
  resultCode: '',
}

export default function userReducers(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN: {
      state.resultCode = action.payload.resultCode
      return state
    }
    default:
      return state
  }
}
