import {
  USER_FAIL,
  USER_REQUEST,
  USER_SUCCESS,
} from '../constants/userConstants';

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };

    case USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    default:
      return state;
  }
};
